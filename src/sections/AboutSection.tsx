import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import Image from 'next/image';
import Link from 'next/link';
interface Props {
  showMoreButton?: boolean;
}
const AboutSection = (props: Props) => {
  const { showMoreButton } = props;
  return (
    <div className="shadow-2xl py-8 px-4">
      <div className="flex flex-col md:flex-row items-center bg-gray-100 pb-4  ">
        <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
          <h2 className="text-4xl md:text-6xl font-base mb-2 uppercase">
            About
          </h2>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase text-red">
            Benin CLub
          </h2>
          <p className="text-gray-700 mb-4">
            Benin club was founded in 1931, by British Nationals until 1964, the
            club was known as EUROPEAN CLUB established by Europeans for their
            own private recreation; sport and entertainment away from the prying
            eyes and alien life of indigenous society, so to speak. The club
            seldom entertained Nigerians, not indigenous sportsmen or nobility.
          </p>
          <p className="text-gray-700 mb-4">
            Club life in Benin club, as a respectable community centre for
            recreation, intercourse and communion has come to stay. Today, the
            club stands proundly amongst the first and best of any kind, in any
            city in Nigeria with a very comfortable clubbing ambience. The
            modern day Benin Club 1931 is a story of success with first class
            facilities for it&apos;s over 3,000 active members. Over the years,
            the values that give us the edge have been sustained. The incipient
            Club house got burnt in 1968 and a lot of valuable records were
            destroyed. The club house was rebuilt in 1972.
          </p>
          <div className="flex gap-3 mt-4 flex-col md:flex-row">
            <div>
              <Link href="/auth/signup">
                <button className={`${buttonStyle} `}>Join The Club</button>
              </Link>
            </div>
            {showMoreButton && (
              <div>
                <Link href="/about">
                  <button className={`${buttonStyleOutline}`}>
                    Learn More
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="relative w-full h-96 md:w-1/2 ">
          <Image
            src="/images/hero.webp"
            alt="Hero background image"
            fill
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
      {!showMoreButton && (
        <div>
          <p className="text-gray-700 mb-4">
            Presently, the club which in promoting the social and recreational
            interests of members has EIGHT sporting sections, namely: GOLF, LAWN
            TENNIS,TABLE TENNIS, SQUASH, BILLIARDS/SNOOKER, DART, SWIMMING POOL,
            LEISURE GAMES (ASO ROCK). The club also has ONE social/Academic
            section known as BUS STOP. The club jas witnessed, and still
            witnessing signigicant growth and expansion of itss facilities and
            infrastructure. The standard 18-hole Golf course hosts, on a regular
            basis, championships with golfers from all over the country
            participating. The club has air conditioned Squash Courts with rear
            glass back and sitting gallery for spectators. It is pertinent to
            mention that the club has produced some of the best Golf, Darts,
            Table Tennis, Lawn Tennis, Billiards/Snooker and Scrabble players in
            Nigeria.
          </p>
          <p className="text-gray-700 mb-4">
            The Golf section was built in 1872 by Pedracchi Nigeria Ltd. The
            Golf section was extended in 1984 and rebuilt in 2009. Over the
            years additional facilities have been built. The Swimming Pool was
            built in 1965; the Squash Court in 1977; Darts and Table Tennis were
            introduced in 1975 and 1990 respectively. The BUS STOP Section, the
            Social Political arm of the Club, was recognized in 1982. Since
            inception, the section has brought a lot of color and excitement
            into the political process of the club during electioneering with
            its Annual Manifesto Night. An exciting feature that was introduced
            into the Club&apos;s activities in 1984 was the President&apos;s Cup
            which is organized and keenly contested in each section. Winners are
            presented with Trophies and various other prizes by the president.
          </p>
          <p className="text-gray-700 mb-4">
            In this course of its history, the Club has often availed the
            society of its facilities. In the seventies, eighties, nineties and
            the early part of the milennium, the Club served as alternate venue
            for the Ogbe Hard Court Tournaments. Inter-stae Cricket Tournaments
            among Secondary Schools in Bendel State were held on the Golf
            Course. Athletes involved in track and field events were trained on
            the Golf course. The Swimming Pool was used for the training of
            athletes preparing for major competitions. We give great kudos to
            giants like late T.A Ogbe, Olu Akpata, Dr. Benji Oni Okpuku, etc and
            the pioneering spirit of those who mid-wifed the transition from
            European Club to Benin Club and its inevitable Africansation without
            much loss of Standard and Philosophy.
          </p>
          <p className="text-gray-700 mb-4">
            Chief Anthony Enahoro, CFR the father of Golf was the first Nigerian
            member of the club. He became an Honorory Member of the club in
            1955, on honor conferred on him by the Resident (who was his Golf
            playmate) when the club was still an ALL European club in his
            capacity as a Minister holding a number of portfolios, Membership
            cuts across a broad spectrum of people form all walks of life who
            are prepared to adhere religiously to the club&apos;s code of
            conduct.
          </p>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
