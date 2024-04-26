
const Footer = () => {
    return (

        <div className="mb-0">
            <footer className="pb-4 lg:pb-14 footer-border text-white footer lg:pl-40 p-10 bg-[#002147] text-base">
                <aside className="text-center ml-8 lg:ml-0">
                    <img className="w-16 rounded-md ml-[88px]" src="https://i.ibb.co/HqPy6TW/iconfav.jpg" alt="" />
                    <p className=""><span className="text-2xl">StayComfortInn</span><br />Providing reliable tech since 1992</p>
                </aside>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-center justify-between">
                    <div className="flex text-center gap-16 lg:mx-5">
                        <div className="flex flex-col">
                            <h6 className="footer-title">Services</h6>
                            <a className="link link-hover">Branding</a>
                            <a className="link link-hover">Design</a>
                            <a className="link link-hover">Marketing</a>
                            <a className="link link-hover">Advertisement</a>
                        </div>
                        <div className="lg:ml-24 flex flex-col">
                            <h6 className="footer-title">Company</h6>
                            <a className="link link-hover">About us</a>
                            <a className="link link-hover">Contact</a>
                            <a className="link link-hover">Jobs</a>
                            <a className="link link-hover">Press kit</a>
                        </div>
                    </div>
                    <div className="lg:ml-28 flex flex-col text-center items-center lg:mr-20">
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </div>
                </div>
            </footer>
        </div>

    );
};

export default Footer;