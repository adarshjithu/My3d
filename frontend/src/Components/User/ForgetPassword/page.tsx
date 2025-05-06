"use client";
import { forgetUserPassword } from "@/Services/userServices";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SuccessModal from "../Modals/SuccessModal";
import ButtonLoading from "../Loading/ButtonLoading";

const ForgetPasswordModal = ({ forgetPasswordModal, setForgetPasswordModal }: any) => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let time: any = localStorage.getItem("my-3d-pic-forget-time");
        if (!time) {
            const dt = Date.now();
            localStorage.setItem("my-3d-pic-forget-time", String(dt));
            time = dt;
        }
        const now = Date.now();
        const diff = (now - parseInt(time)) / 1000;

        try {
            if (diff > 300) {
                localStorage.setItem("my-3d-pic-forget-time", String(Date.now()));
                setLoading(true);
                const res = await forgetUserPassword(email);
                setForgetPasswordModal(false);
                setIsOpen(true);
                setLoading(false);
            } else {
                toast.error("Link already send please check your email");
                setLoading(false);
            }
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
    };

    return isOpen ? (
        <SuccessModal isOpen={isOpen} setIsOpen={setIsOpen} message="Forget password Link have been send to your email" path="/" />
    ) : (
        <>                                                                       
            {forgetPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-semibold mb-4">Forgot Your Password?</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">
                                    Enter your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                            {message && <div className="mb-4 text-green-600">{message}</div>}
                            <div className="flex justify-between items-center">
                                <button type="button" onClick={() => setForgetPasswordModal(false)} className="text-gray-500 hover:text-gray-700">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-4 py-2 rounded-lg font-semibold ${
                                        isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"
                                    }`}
                                >
                                    {loading ? <ButtonLoading /> : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ForgetPasswordModal;
