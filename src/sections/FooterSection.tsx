import Loading from "@/components/Loading";
import { buttonStyleOutline, buttonStyleW } from "@/constants/styles";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMapMarker, FaPhone, FaEnvelope, FaCheck } from "react-icons/fa";

const FooterSection = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedNewsletter, setSubmittedNewsletter] = useState(false);

  async function createNewsletterSubscription(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setLoading(false);
        setEmail("");
        setSubmittedNewsletter(true);
      } else {
        // Handle errors, e.g., display an error message
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to create newsletter subscription"
        );
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error("Error creating newsletter subscription:", error);
      setLoading(false);
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      {!session && (
        <section className="bg-red py-4  ">
          <div className="items-center justify-between flex flex-col md:flex-row  mx-auto lg:max-w-7xl px-4 md:px-8  w-full">
            <div className="flex md:flex-row flex-col gap-0 md:gap-4 mb-2 md:mb-0 uppercase items-center">
              <h2 className="text-white text-2xl md:text-4xl font-light">
                Would you like to
              </h2>
              <h2 className="text-3xl md:text-5xl font-bold text-pink">
                join the club?
              </h2>
            </div>
            <Link href="/auth/signup">
              <button className={buttonStyleOutline}>Join Benin Club</button>
            </Link>
          </div>
        </section>
      )}
      <footer className="relative py-12 bg-black">
        <div className="absolute inset-0">
          <Image
            src="/images/upperLonge/image1.jpg"
            alt="footer background"
            fill
            className="object-cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>
        <div className="relative  container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <div className="text-white md:pr-8">
            <div className="flex flex-row gap-4">
              <h2 className="text-3xl md:text-5xl font-base mb-8">VISIT</h2>
              <h2 className="text-3xl md:text-5xl font-bold text-red mb-8">
                BENIN CLUB
              </h2>
            </div>
            <p className="mb-8">
              Club life in Benin club, as a respectable community centre for
              recreation, intercourse and communion has come to stay. Today, the
              club stands proundly amongst the first and best of any kind, in
              any city in Nigeria with a very comfortable clubbing ambience.
            </p>
            <ul className="space-y-2 mb-8">
              <li>
                <FaMapMarker className="inline-block mr-2" />1 Ambrose Ali
                Avenue GRA, P.O. Box 393, Benin City
              </li>
              <li>
                <FaPhone className="inline-block mr-2" />
                +234(0) 7059762558
              </li>
              <li>
                <FaEnvelope className="inline-block mr-2" />
                info@beninclub1931.com
              </li>
            </ul>
          </div>
          <div className="text-white">
            <div className="flex flex-row gap-4">
              <h2 className="text-3xl md:text-5xl font-base mb-8">SUBSCRIBE</h2>
              <h2 className="text-3xl md:text-5xl font-bold text-red mb-8">
                NOW
              </h2>
            </div>
            <p className="mb-4">
              Subscribe to our newsletter so you don&apos;t miss important
              update
            </p>
            <form onSubmit={createNewsletterSubscription}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-2 px-2 bg-white text-black rounded-lg mb-4"
                onChange={handleEmailChange}
              />
              {loading ? (
                <Loading />
              ) : submittedNewsletter ? (
                <button className="bg-green py-2 px-4 rounded-lg flex items-center gap-4 ">
                  <FaCheck /> Subscibed
                </button>
              ) : (
                <button type="submit" className={`${buttonStyleW}`}>
                  Subscribe
                </button>
              )}
            </form>
          </div>
        </div>
        <hr className="relative my-8 border-white" />
        <div className="absolute bottom-5 left-0 right-0 text-center mt-8 text-white z-10">
          <p>&copy; 2023 Benin Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;
