import { mailOptions, transporter } from "../api/nodemailer";
import ContactUsButton from "../components/ContactUsButton"

export default async function Contact() {

    async function sendEmail(data: FormData) {
        "use server";
        const name = data.get("name")
        const email = data.get("email")
        const message = data.get("message")?.toString() || ""

        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: `RENT-IT msg from -> ${name}`,
                html: `<h1>Contact Page Message</h1><h2>from: ${name}</h2><h2>email: ${email}</h2><p>${message}</p>`,
            })
        } catch (e) {
            console.log(e)

        }

    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen" >
            <h1 className="text-4xl font-bold mb-8 ">Contact Us</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <form action={sendEmail}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="border border-gray-300 text-black rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="border border-gray-300 text-black rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 text-lg font-semibold mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="border border-gray-300 text-black rounded-lg p-2 w-full h-40 resize-none focus:outline-none focus:border-blue-500"
                            placeholder="Enter your message"
                        ></textarea>
                    </div>
                    <ContactUsButton />
                </form>
            </div>
        </div>
    )

}
