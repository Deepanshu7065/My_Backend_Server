import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./ApiEndPoint";

function AuthVerifier() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const verifyApi = async () => {
            try {
                if (token) {
                    const res = await axios.post(
                        `${baseUrl}/verify`,
                        {},
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    if (res.data.user) {
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                        // navigate("/");
                    }
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
            }
        };

        verifyApi();
    }, []);

    return null;
}

export default AuthVerifier;
