import React, { useEffect, useState, useContext} from "react";
import { Context } from "../store/appContext";

export const Card = () => {
    const { store, actions } = useContext(Context)
    const [userAccounst,setUserAccounts]=useState([])
    // const [userNameAccounts, setUserNameAccounts] = useState("")
    // const [userCoinAccounts, setUserCoinAccounts] = useState("")
    // const [userBalanceAccounts, setUserBalanceAccounts] = useState("")
    // const [userTypeAccounts, setUserTypeAccounts] = useState("")


    async function getAccountsUser() {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZtLJEdvHSwRXZt17-888_aVJrmBrvu6RtYBoKMpKm9sEC-AxXi3sRWKgbFwf-p4hj2-84XL-87bz_Y0G7zB8iX-0y0kE4onkjgxSurJ2xjcvjN5j0SznVQpWIrQcTHHpW6OV8NIiNT91dMN_DBpqn7Ku0inf13JGgK7eJyftdxiu-_vwQHTzVbsiQN30MKU5UG7jMXXLPbrbXHRtaabX2EnUEHxglQZieSfFmtvDEvoGq26C0ixTRdmpVddBdux-ENmx93bhGaMFMQoE6ieOHEM83IjYztMG5XWr9WXCNyA1uGfaxE2rWP9qtlcvPoOYfgN6ci_aqRSxMumE5s_yvdu62T4sRgFVhMGDTrKF4hsNtkxzk7-6yHbnQMbXGg1BrVNUA7nZp5aj6i7lp67WQpPN3HqPkM0hUFDodFluRq3WaibUehanTF0-ewI7h5X1LsMbv-lO1qi7d2QsYT2jxyfxqO17Iz9os0znyuhBTZk7naL3yyXiwLpwzk6yyLHiEotFHha8NPLbJ9qdLu_rKxVO8xQyG8xYErsUqSl-x9PArSo6oudhd59gqyVxuPsQSVcKz-trvEPExQEVUXHK8gYdpnK3HwpenhoR-GqCxXjWtG1qXiRC78se1u9qYaFloMPMnqfZjkeHQAN5y_f2-2PcaX76KvzDWCwqsuWuYk5mq4yJxc6vdF2w0A2oIpPJn-s9aIA-0G9zo2FneXGU6WH10y8G430F-E9YqNjfepj32J53HEfcQS5mcl_WV8V98etWQS7FserlTT__EW-eM1dI3UvVAHV5ptaSNhbqaI8OXBjfm0onnpmrN5QqBn3W9tQRO6q1A_H7UhRGVUb5IFb-TKC033oG4rYb__EwxNQ1rx3uaXqahbtxSDNnASci2j_jHRQOIp68krpmiZT_BTb80OYh8znnE-L-JdM25WYEoIi5WUKtjyl5P0Wi_-ZN8IkCqcCuruodh4wn9L5TjeyLeXYTcBN8ltxypEXbt6F5g");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/1/accounts`, requestOptions);
            const result = await response.json();
            setUserAccounts(result.result)
            console.log(userAccounst);
            
            
        } catch (error) {
            console.error(error);
        };
       
    }
    useEffect(() => {
        getAccountsUser()
    }, [])
    return (
        <div className="card mb-3 row">
            <div className="card-body d-flex justify-content-around col-8 align-items-center ">
                <h5 className="card-title ">Nombre Cuenta</h5>
                <div className="justify-content-center">
                    <div className="d-flex ">
                        <p className="card-text justify-content-around">Saldo</p>
                        <i className="bi bi-eye-fill"></i>
                        <i className="bi bi-eye-slash-fill"></i>
                    </div>
                    <p className="card-text ">Moneda</p>
                </div>
            </div>
            <div className="card-body d-flex justify-content-around col-2 align-items-center ">
                <a href="#" className="btn btn-primary  ">Button</a>
            </div>

        </div>
    )
}