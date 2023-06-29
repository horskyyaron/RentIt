"use client";
import { ImageUploader } from "@/components/ImageUploader";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SendIcon, Terminal } from "lucide-react";
import { TypographyP } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";

export default async function OfferForm() {
  const router = useRouter();

  const [sent, setSent] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing({
    endpoint: "imageUploader", // replace this with an actual endpoint name
    onClientUploadComplete: () => {
      // alert("uploaded successfully!");
      console.log("cool");
    },
    onUploadError: () => {
      alert("error occurred while uploading, please try and publish again");
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (files.length == 0) {
      alert("add at least one image to send!");
      return;
    }
    setIsFetching(true);

    const form = e.currentTarget;
    const item_name = form.elements.namedItem("name") as HTMLInputElement;
    const description = form.elements.namedItem(
      "description"
    ) as HTMLInputElement;
    const rent = form.elements.namedItem("rent") as HTMLInputElement;

    console.log(files);

    try {
      //upload to uploadthing server
      const res = await startUpload(files).then(async (ut_data) => {
        //update db.
        const res = await fetch("/api/ask", {
          body: JSON.stringify({
            item_name: item_name.value,
            description: description.value,
            rent: rent.value,
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
          console.log(error);
        } else {
          console.log("db updated!!!!");
        }
      });
    } catch (error) {
      console.log(error);
    }

    //reset the form and states fields
    setIsFetching(false);
    item_name.value = "";
    description.value = "";
    rent.value = "1";
    setFiles([]);
    setSent(true);
  }

  function handleAnother() {
    setSent(false);
    router.refresh();
  }

  if (sent) {
    return (
      <div className="text-white flex flex-col items-center justify-center mt-24">
        <div className="flex justify-center items-center mt-10">
          <div>
            <Alert>
              <Terminal />
              <AlertTitle className="flex">
                <TypographyP label="Published!" />
                <SendIcon className="ml-2" />
              </AlertTitle>
              <AlertDescription>
                Your Request has been sent to the community!
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <Button onClick={handleAnother} variant="secondary">
            Ask for another item
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              router.push("/renting-portal");
            }}
          >
            Go to portal
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center text-black justify-center mt-5">
        <h1 className="text-4xl font-bold mb-8 text-white">
          Request an item from the community!
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-lg font-semibold mb-2"
              >
                Item Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border border-gray-300  rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter item name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 text-lg font-semibold mb-2"
              >
                Item Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border border-gray-300 rounded-lg p-2 w-full h-40 resize-none focus:outline-none focus:border-blue-500"
                placeholder="Enter item description"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="rentPerDay"
                className="block text-gray-700 font-bold mb-2"
              >
                How much are you willing to pay each day?
              </label>
              <div className="flex">
                <input
                  type="number"
                  name="rent"
                  id="rent"
                  min={1}
                  max={5}
                  className="w-1/2 border border-gray-300 rounded-l-md py-2 px-3 "
                  placeholder="Enter rent amount"
                  required
                />
                <span className="bg-gray-200 py-2 px-3 rounded-r-md ">
                  🪙/day
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="rentPerDay"
                className="block text-gray-700 font-bold mb-2"
              >
                How does the item looks like? attach images for reference
              </label>
              <ImageUploader files={files} setFiles={setFiles} />
            </div>
            <div className="text-gray-500 text-sm mt-6 mb-6">
              <h2>Tips:</h2>
              <p>
                Add more than one picutre, it will be clearer for other users
                what is the item that you&apos;re looking for.
              </p>
              <p>Choose categories, as people often search by category.</p>
            </div>
            <button type="submit" className="text-black">
              {isFetching ? "uploading...." : "publish item!"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
