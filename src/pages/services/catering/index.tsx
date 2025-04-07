import Gallery from '@/components/Gallery';
import { services } from '@/constants/servicesCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import React from 'react';

export default function Kitchen() {
  const { title, description } = services[1];
  return (
    <>
      <HeroSectionPage
        image="/images/manetKitchen/image3.JPG"
        name={title}
        desc={description}
      />
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              CANDYLAND
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Specializes in making all varieties of confectionaries such as
              Shawarma, Club Sandwich, Scotched Eggs, Cakes, Meat Pie, Chicken
              Pie, Fish Pie, Sausage Roll, Egg Roll etc.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              They also make Popcorn, Ice Cream of different flavour, Cocktails,
              Chapman, Candy Floss, Bread and Small chops. They sell children
              toys and render indoor and outdoor catering services.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              You can contact them on 08033009052.
            </p>
            <Gallery images={['image1.JPG', 'image2.JPG']} link="/candyland" />
          </div>

          <div className="mt-12">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
            VICTORIOUS MEGA KITCHEN (VMK)
            </h2>

            <p className="mt-4 text-lg text-gray-500">
            They offer indoor and outdoor catering services around the Country.</p>
            <p className="mt-4 text-lg text-gray-500">
<b>CONTINENTAL DISHES:</b> Fried Rice, White Rice, Jollof Rice, Vegetable Rice, Basmatic Fried Rice, including Rice and Beans.</p>
<p className="mt-4 text-lg text-gray-500">

<b>AFRICAN DISHES:</b> Pounded Yam, Eba, Starch, Semovita, Poundo, Fufu, Wheat, etc.

There are also Beans, Yam Porridge, Dodo, Garden Egg, Boiled Plantain, Leaf Moi Moi, Cup Moi Moi.</p>
<p className="mt-4 text-lg text-gray-500">
<b>VARIETIES OF SOUP:</b>  Edekaeko Soup, Afang Soup, Banga Cat Fish Soup, Bitter Leaf Soup, Oha Soup, Egusi Soup, Ogbolo Soup.</p>
<p className="mt-4 text-lg text-gray-500">
All kinds of Fish and Meats, such as: Melluza Fish, Vegetable Fish, Fried Chicken, Fried Turkey, Fried Beef, Boiled Eggs, and Assorted Meat Stew, Palm Oil Stew and Beef. </p>
<p className="mt-4 text-lg text-gray-500">
<b>BREAD:</b>  We offer Coconut Bread, Butter Bread, Wheat Bread, VMK Special Sliced Bread, Sardine Bread, Banana Bread, Burger Bread.</p>
<p className="mt-4 text-lg text-gray-500">
<b>Victorious Mega Kitchen Branches:</b>
- 7, Ihama Road, G.R.A Opp. Royal Marble Hotel, Benin City, Edo State.
- Central Ugbor Road, Opp. Ogunmwenyi Junction, Benin City, Edo State.
- 2b, Osagiede Street, Opp. St. Regis Hotel, Water Resource, G.R.A, Benin City, Edo State.
 Contact us:  09152436986, 08083389253.

            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              MIMI&apos;S KITCHEN
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              They offer indoor and outdoor catering services.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              African dishes are available such as Pounded Yam, Semo, Starch,
              Amala, Garri (Eba) with soup like Banga, Okro, Black soup, Oha,
              Bitter Leaf, White soup, Egusi, Ogbono, and Vegetable Soup.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Continental Dishes includes Basmati Fried and Jollof Rice, Curry
              Sauce and Rice, VP Sauce and Rice, Salad etc.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              All kinds of meat and assorted Pepper soup are also available.
              Nkwobi is available also with different varieties of meat.{' '}
            </p>
            <p className="mt-4 text-lg text-gray-500">
              You can contact them on 07034499317.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
