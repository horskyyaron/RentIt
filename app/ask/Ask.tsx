"use client";
import { ImageUploader } from "@/components/ImageUploader";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

export default async function Ask() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      // alert("uploaded successfully!");
      console.log("cool");
    },
    onUploadError: (e) => {
      console.log("uploadthing error:", e);
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
      <div className="mt-24 flex flex-col items-center justify-center text-white">
        <div className="mt-10 flex items-center justify-center">
          <div>
            <h1>sent to community!</h1>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button onClick={handleAnother}>Ask for another item</button>
          <button
            onClick={() => {
              router.push("/renting-portal");
            }}
          >
            Go to portal
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-lg font-semibold text-gray-700"
          >
            Item Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg  border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Enter item name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="mb-2 block text-lg font-semibold text-gray-700"
          >
            Item Description
          </label>
          <textarea
            id="description"
            name="description"
            className="h-40 w-full resize-none rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Enter item description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="rentPerDay"
            className="mb-2 block font-bold text-gray-700"
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
              className="w-1/2 rounded-l-md border border-gray-300 px-3 py-2 "
              placeholder="Enter rent amount"
              required
            />
            <span className="rounded-r-md bg-gray-200 px-3 py-2 ">🪙/day</span>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="rentPerDay"
            className="mb-2 block font-bold text-gray-700"
          >
            How does the item looks like? attach images for reference
          </label>
          <ImageUploader files={files} setFiles={setFiles} />
        </div>
        <div className="mb-6 mt-6 text-sm text-gray-500">
          <h2>Tips:</h2>
          <p>
            Add more than one picutre, it will be clearer for other users what
            is the item that you&apos;re looking for.
          </p>
          <p>Choose categories, as people often search by category.</p>
        </div>
        <button type="submit" className="text-black">
          {isFetching ? "uploading...." : "publish item!"}
        </button>
      </form>
    );
  }
}
