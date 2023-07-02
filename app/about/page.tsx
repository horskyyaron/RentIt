export const metadata = {
    title: "About",
};

export default async function About() {
    return (
        <div className="mt-5 flex flex-col items-center justify-center">
            <h1 className="mb-8 text-4xl font-bold">About Us</h1>
            <p className="max-w-md text-center text-lg">
                Welcome to our renting web application! We provide a convenient platform
                for users to rent and offer various items for rent. Whether you&apos;re
                looking to rent out your unused items or in need of renting something
                for a short period, our application has got you covered.
            </p>
            <p className="mt-4  max-w-md text-center text-lg">
                With our user-friendly interface, you can easily browse through a wide
                range of available items, explore their details, and connect with the
                owners to arrange the rental. From tools and equipment to household
                items and electronics, you&apos;ll find a diverse selection of items to
                choose from.
            </p>
            <p className="mt-4  max-w-md text-center text-lg">
                Join our renting community today and experience the convenience and
                affordability of renting. Start earning by offering your items for rent
                or find the perfect item to meet your temporary needs. Renting has never
                been easier!
            </p>
        </div>
    );
}
