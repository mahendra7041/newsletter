import React, { useState } from "react";
import axios from "axios";

function Newsletter() {
    const [email, setEmail] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();

        const apiUrl = import.meta.env.VITE_API_URL;

        axios
            .post(apiUrl, {
                email,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="container mx-auto h-screen w-full max-w-6xl bg-white font-inter">
            <div className="flex h-screen items-center">
                <div className="w-full rounded-2xl bg-indigo-600 pt-16 pb-20">
                    <div className="mx-auto flex w-2/3 flex-col items-center justify-center space-y-6">
                        <h1 className="font-bold text-white text-4xl">
                            Get notified when we're launching.
                        </h1>
                        <p className="text-center font-light text-indigo-200 text-lg">
                            Sagittis scelerisque nulla cursus in enim
                            consectetur quam. Dictum urna sed <br /> consectetur
                            neque tristique pellentesque.
                        </p>
                        <form onSubmit={sendEmail} className="space-x-3">
                            <input
                                className="max-w-[340px] rounded-md px-5 py-3 placeholder:text-gray-500 focus:outline-none"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <button className="rounded-md bg-indigo-500 px-8 py-3 text-white transition-colors hover:bg-indigo-500/70">
                                Notify me
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Newsletter;
