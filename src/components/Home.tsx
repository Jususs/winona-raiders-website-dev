// import AutoplaySlider from "react-awesome-slider";
// import 'react-awesome-slider/dist/styles.css';

// const importAll = (r) => {
//     return r.keys().map(r);
// };
//
// const images = importAll(
//     require.context("../../img/gallery", false, /\.(png|jpe?g|svg)$/)
// );
//
// const getGalleryImages = (images) => {
//     let galleryImages = [];
//     images.forEach((image, index) => {
//         galleryImages.push(<div key={`gallery-image-${index}`} data-src={image} />);
//     });
//     return galleryImages;
// };

export const Home = () => {
    // TODO: add styles for slider + h6 + p + gallery images
    // TODO: slider has errors

    return (
        <>
            <div className="flex flex-auto h-lvh bg-[url(../img/Home_bg.jpg)] bg-cover opacity-50">
                <div className="flex flex-col pb-4 h-full">
                    <p>Home TEST</p>

                    {/*<AutoplaySlider*/}
                    {/*    // play={true}*/}
                    {/*    // cancelOnInteraction={true}*/}
                    {/*    // interval={4000}*/}
                    {/*    organicArrows={false}*/}
                    {/*    // cssModule={AwesomeSliderStyles}*/}
                    {/*>*/}
                    {/*    {getGalleryImages(images)}*/}
                    {/*</AutoplaySlider>*/}

                    <div className="max-w-[800px] p-6 items-center content-center from-white to-black">
                        <p>
                            Wir sind ein 1995 gegründetes Ultimate Frisbee Team aus Mödling.
                            Unsere gut 40 aktiven Mitglieder vereint die Begeisterung am Sport
                            mit der Frisbeescheibe. <br />
                            Der Verein umfasst folgende Teams:
                        </p>
                        <h6>
                            - Winona Raiders
                        </h6>
                        <p>
                            Die Kampfmannschaft des Vereins trainiert zweimal pro Woche und
                            bereitet sich so nicht nur auf zahlreiche Turniere sondern auch
                            auf das Highlight der Saison, die Österreichischen Beach
                            Staatsmeisterschaften in Bibione, vor.
                        </p>
                        <h6>
                            - Privateers
                        </h6>
                        <p>
                            Mädchen und Burschen im Alter von 10 bis 15 spielen in unserem
                            Team "Privateers". Die Jugendmannschaft des Vereins trainiert
                            einmal pro Woche und nimmt an zahlreichen Turnieren im Jahr teil.
                        </p>
                        <p>
                            Alle, die einen fairen Teamsport ausüben möchten, sind bei uns
                            herzlich willkommen! Du suchst ein Frisbee-Team in Mödling? Melde
                            dich bei uns (
                            <a href={"mailto:info@winonaraiders.org"} className="underline text-cyan-700 hover:text-cyan-800 visited:text-purple-600">
                                info@winonaraiders.org
                            </a>
                            ) und schau vorbei, wir freuen uns auf dich!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
