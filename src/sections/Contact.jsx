import React, {useRef, useState} from 'react'
import TitleHeader from "../components/TitleHeader.jsx";
import ContactExperience from "../components/ContactExperience.jsx";
import emailjs from "@emailjs/browser"

const Contact = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
            )

            setFormData({name: '', email: '', message: ''});
        }catch (e) {
            console.log("EMAILJS ERROR:", e);
        }finally {
            setLoading(false);
        }
    }

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader title="Get In Touch With Me" sub="📧 Contact Information" />

                <div className="mt-16 grid-12-cols">

                        {/* Contact Form - Left Side */}
                        <div className="xl:col-span-5">
                            <div className="flex-center card-border rounded-xl p-10">
                                <form ref={formRef} className="w-full flex flex-col gap-7" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            name="message"
                                            rows="5"
                                            placeholder="Enter your message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" disabled={loading}>
                                        <div className={`cta-button group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                            <div className="bg-circle" />
                                            <p className="text">{loading ? 'Sending...' : 'Submit Message'}</p>
                                            <div className="arrow-wrapper">
                                                <img src="/images/arrow-down.svg" alt="arrow"/>
                                            </div>
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* 3D Experience - Right Side */}
                        <div className="xl:col-span-7 min-h-96">
                            <div className="w-full h-full bg-[#cd7c2e] hover:cursor-grab rounded-3xl overflow-hidden">
                                <ContactExperience />
                            </div>

                        </div>
                    </div>
            </div>
        </section>
    )
}

export default Contact
