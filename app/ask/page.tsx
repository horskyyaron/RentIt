"use client";
import { useForm, Controller, useFormState } from "react-hook-form";
import { Button, DatePicker, InputNumber } from "antd";
const { RangePicker } = DatePicker;
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Alert, Snackbar, TextField } from "@mui/material";
import { ImageUploader } from "@/components/ImageUploader";
import { useState } from "react";
import dayjs from "dayjs";
import { useUploadThing } from "@/lib/uploadthing";

type FormInput = {
  dates: [string, string];
  item_name: string;
  item_description: string;
  rent: number;
};

export default function AskPage() {
  const { control, handleSubmit, reset } = useForm<FormInput>();
  const [files, setFiles] = useState<File[]>([]);
  const { isSubmitting, isSubmitSuccessful, errors } = useFormState({
    control,
  });
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      // alert("uploaded successfully!");
      console.log("cool");
    },
    onUploadError: () => {
      alert("error occurred while uploading, please try and publish again");
    },
  });

  const resetForm = () => {
    setOpen(true);
    reset({
      item_name: "",
      item_description: "",
    });
    setFiles([]);
  };

  const onSubmit = async (data: FormInput) => {
    //getting the dates
    const { dates, item_description, item_name, rent } = data;
    let [from, to] = dates;
    from = dayjs(from).format("DD/MM/YYYY");
    to = dayjs(to).format("DD/MM/YYYY");

    if (files.length == 0) {
      alert("add at least one image to send!");
      return;
    }

    try {
      //upload to uploadthing server
      const res = await startUpload(files).then(async (ut_data) => {
        //update db.
        const res = await fetch("/api/ask", {
          body: JSON.stringify({
            item_name: item_name,
            description: item_description,
            rent: rent,
            uploadingthing_data: ut_data,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const { msg, error } = await res.json();
        if (error) {
          console.log("there was an error");
        } else {
          console.log("db updated!!!!");
        }
      });
    } catch (error) {
      console.log(error);
    }
    setOpen(true);
    resetForm();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <h1>Item Information</h1>
        <Controller
          render={({ field }) => (
            <TextField {...field} variant="outlined" label="Item Name" />
          )}
          name="item_name"
          control={control}
          rules={{
            required: { value: true, message: "required" },
          }}
        />
        {errors.item_name && (
          <p className="text-sm text-red-500">{errors.item_name.message}</p>
        )}
        {/* TODO: when extracting the data, replace \n with enter or something*/}
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="Item Description"
              rows={2}
              multiline
            />
          )}
          name="item_description"
          control={control}
          rules={{
            required: { value: true, message: "required" },
            minLength: { value: 5, message: "description too short" },
          }}
        />
        {errors.item_description && (
          <p className="text-sm text-red-500">
            {errors.item_description.message}
          </p>
        )}
        <h1>When would you like to rent your item?</h1>
        <Controller
          render={({ field }) => (
            // @ts-ignore
            <RangePicker
              {...field}
              separator={<KeyboardDoubleArrowRightIcon />}
              format={"DD/MM/YYYY"}
            />
          )}
          name="dates"
          control={control}
          rules={{
            required: { value: true, message: "required" },
          }}
        />
        {errors.dates && (
          <p className="text-sm text-red-500">{errors.dates.message}</p>
        )}
        <h1>How much are you willing to pay per day?</h1>
        <Controller
          render={({ field }) => (
            // @ts-ignore
            <InputNumber {...field} placeholder="1" min={1} />
          )}
          name="rent"
          control={control}
          rules={{
            required: { value: true, message: "required" },
            min: { value: 1, message: "at least one coin" },
          }}
        />
        {errors.rent && (
          <p className="text-sm text-red-500">{errors.rent.message}</p>
        )}

        <h1>How does your item look like? attach images for reference</h1>
        <ImageUploader files={files} setFiles={setFiles} />

        <div className="flex items-center justify-center">
          {isSubmitting ? (
            <Button type="default" loading disabled>
              Publishing item...
            </Button>
          ) : (
            <Button
              type="default"
              htmlType="submit"
              className="mr-3 bg-slate-400"
            >
              send
            </Button>
          )}
          <Button
            type="default"
            className="bg-red-200"
            onClick={() => {
              resetForm();
            }}
            disabled={isSubmitting}
          >
            clear
          </Button>
        </div>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Your request has been made!
        </Alert>
      </Snackbar>
    </>
  );
}
