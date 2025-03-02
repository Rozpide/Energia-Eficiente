import React, { useEffect, useContext,useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "/src/front/styles/sidebar.css";


export const Sidebar = () => {
    const [userName, setUserName] = useState("")
    const [userLastName, setLastUserName] = useState("")
    const { store, actions } = useContext(Context)
    
	const handleClick = () => {
		actions.logout()
	}

    async function getUser() {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZsY5nM0Bh-G8KdaZucRe2wc-P0OBfWNR4e_Ry-wYVh6y7msxvQ0bt_A84DgHodrU_OCCrKzu1cgD7lBCg0Y9XtWdLuWjQ5bDQEa6nI-aPNG721L5Swl3R7MTaWyc63l2Gfva0VAPJd5aTjfuIPHuEUwqsm5SBixx1f0LbKQSz3YRcuUinDNLwoMSypZCqgCRKw0vXaf_WPMxJXnwem-NNI6X2zDt3Ts0S7w44nPpfiSZgnkudY_gI48iqzvAxpwzKCWfCgP__g__IUpKfqJ96iiVcw05AtVf6MOhmmTS4q5bIt__wa4FeBk_GBHEspoCt-Rf_W2PmhdrGi7dbasxNmRqTjrhWf-1U6g1WoxuvUZrqwJ_D0u-NS5wFmDVQRY0JZjgUv-HnMddgQ32FlS6l8w9Q5l9KmMt7QliLxjvXlWcPbmiIhIrcDuPlr9NKFakMg9CFX-kuVToRFwszOO7kPJn5QbAeeYdxsx5OSAL2lTO2haHjRoHaAaLdfGBIDmOdKeiymLmcrw7ro0RER4FBmm9G-kNPIYGhYgI4NxpK9stDaRD4h49usa6GGyPzBN-iyXVh-Cz6w-QpoaauccXovZnnPSZcSLW-VO4tEiLkAiqgFoLq2tvwTam5z5ZCqfSwmxvYa87f10Fhd-kX-4thA_nLPhaXA4fC7cY0V2WvemkDP4MiykRK9x4RhI4BzIg3bxy1fX9bBQ7gggODLTokhOHSfPJ_JG9u-3YjgaeLdtOBby5h5Jk8AvpXBDG4bZNQAvhdvCfeOVdIW-SVLxZrypB8wh76WzWFDGsiZRXCnXtilF0VkPULs1VLOChY-cSAlrzpgFCA2OAwmY5QczvAn7oAMcf8_Rsc82Wg1NrsgmFqIoagVgUIaYsTaKMLvwnTKf06Q4jz01sGRqbDy_9c-QQ1v_OQjT2xYTbYjPsituCX0UUSeaYPEVyDEsOo1KAzM3mqPSSoJfLfYHPuf-26Wp");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/1`, requestOptions);
            const result = await response.json();
            console.log(result);
            
            
            setUserName(result.result.first_name.toUpperCase())
            setLastUserName(result.result.last_name.toUpperCase())
        } catch (error) {
            console.error(error);
        };
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className="sidebar">
            <div>
                <Link to="/cuentas" className="d-flex justify-content-evenly text-white text-decoration-none">
                    <span className="fs-4">Optima</span>
                    <img src="" alt="logo" width="32" height="32" />
                </Link>
            </div>
            <div className="d-flex flex-column">
                <p className="p-2">Welcome
                    <br></br>
                    <span className="p-2">slogan</span>
                </p>
                <div className="d-flex">
                    <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${userName}`} width="50" height="50" className="avatar" />
                    <p className="p-2">{userName} {userLastName}</p>
                </div>
            </div>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/cuentas" className="nav-link active">
                        <i className="bi bi-person-vcard-fill"></i> <span>Cuentas</span>
                    </Link>
                </li>
                <li>
                    <Link to="/movimientos" className="nav-link">
                        <i className="bi bi-graph-up"></i> <span>Movimientos</span>
                    </Link>
                </li>
                <hr />
                <li>
                    <Link to="/faqs" className="nav-link">
                        <i className="bi bi-question-circle"></i> <span>FAQs</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link logout" onClick={handleClick}>
                        <i className="bi bi-box-arrow-left logout"></i> <span className="logout">Logout</span>
                    </Link>
                </li>
            </ul>
        </div>

    );
};
