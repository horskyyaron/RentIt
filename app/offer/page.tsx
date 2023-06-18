import AddCategory from "../components/AddCategory";
import SubmitFormButton from "../components/ContactUsButton"
import { ImageUploader } from "../components/ImageUploader";

export default async function OfferForm() {

    const categories: string[] = ["Food"];

    async function offerItem(data: FormData) {
        "use server";
        console.log("new item added!")
    }


    return (
        <div className="flex flex-col items-center text-black justify-center mt-5" >
            <h1 className="text-4xl font-bold mb-8 text-white">Offer Item For Renting</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <form action={offerItem}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-2">
                            Item Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="border border-gray-300  rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 text-lg font-semibold mb-2">
                            Item Description
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="border border-gray-300 rounded-lg p-2 w-full h-40 resize-none focus:outline-none focus:border-blue-500"
                            placeholder="Enter your message"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rentPerDay" className="block text-gray-700 font-bold mb-2">
                            Rent per Day
                        </label>
                        <div className="flex">
                            <input
                                type="number"
                                id="rentPerDay"
                                className="w-1/2 border border-gray-300 rounded-l-md py-2 px-3 "
                                placeholder="Enter rent amount"
                                required
                            />
                            <span className="bg-gray-200 py-2 px-3 rounded-r-md ">$/day</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rentPerDay" className="block text-gray-700 font-bold mb-2">
                            Pictures
                        </label>
                        <ImageUploader />
                    </div>
                    <div className="text-gray-500 text-sm mt-6 mb-6">
                        <h2>Tips:</h2>
                        <p>Add more than one picutre, it will add credibility and confidence for you and your item</p>
                        <p>Choose categories, as people often search by category.</p>
                    </div>
                    <SubmitFormButton label="Publish Item!" />
                </form>
            </div>
        </div>
    )

}

