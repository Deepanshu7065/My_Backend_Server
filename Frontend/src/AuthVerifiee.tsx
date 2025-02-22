import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./ApiEndPoint";
import { useDispatch } from "react-redux";
import { setCustomerUser } from "./Store/CustomerUserSaveSlice";

function AuthVerifier() {
    const navigate = useNavigate();
    const dispatch = useDispatch()


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
                        const user = JSON.parse(localStorage.getItem("user") as string);
                        dispatch(setCustomerUser(user))
                    }
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
