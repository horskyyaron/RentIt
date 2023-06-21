export const metadata = {
    title: 'About'
}

export default async function About() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p className="text-lg max-w-md text-center">
        Welcome to our renting web application! We provide a convenient platform for users to rent and offer various items for rent. Whether you&apos;re looking to rent out your unused items or in need of renting something for a short period, our application has got you covered.
      </p>
        <p className="text-lg  max-w-md text-center mt-4">
          With our user-friendly interface, you can easily browse through a wide range of available items, explore their details, and connect with the owners to arrange the rental. From tools and equipment to household items and electronics, you&apos;ll find a diverse selection of items to choose from.
        </p>
        <p className="text-lg  max-w-md text-center mt-4">
          Our application prioritizes user satisfaction and safety. We ensure that all users undergo a verification process to establish trust within our community. Additionally, we provide secure messaging features to facilitate communication and negotiation between renters and item owners.
        </p>
        <p className="text-lg  max-w-md text-center mt-4">
          Join our renting community today and experience the convenience and affordability of renting. Start earning by offering your items for rent or find the perfect item to meet your temporary needs. Renting has never been easier!
        </p>
    </div>
  )
}

