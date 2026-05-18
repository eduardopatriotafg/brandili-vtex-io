import React, { useEffect } from "react";
// import axios from "axios";
import "./global.css"
import waitForEl from "../../utils/waitForEl";


const BtnTradeProd = () => {

	function makeBtn() {
		waitForEl(".vtex-my-orders-app-3-x-orderDetails .vtex-pageHeader__title", () => {
			
			setTimeout(() => {
				const numOrder: any = document?.querySelector(".vtex-pageHeader__title")?.innerHTML;
				
				const config = {
					headers: {
						"Content-Type": "application/json",
					},
				};

				fetch(`/api/oms/pvt/orders/` + numOrder.replace("Pedido #", ""), config)
					.then(res => res.json())
					.then(resp => {

						console.log(resp, "response order");

						const email = resp?.clientProfileData?.email;

						const link = `https://demo.troquefacil.com.br/order/${numOrder.replace("Pedido #", "")}/${email.replace(/-.*.ct/, '').replace(".vtex.com.br", "")}?embed=1`;

						let elLink = document?.createElement("a");

						elLink.setAttribute("href", link);
						elLink.setAttribute("target", "_blank");
						elLink.classList.add("btnTradeProd");
						elLink.textContent = "Troca ou Devolução";

						let elParent = document?.querySelector(" main.vtex-my-orders-app-3-x-orderDetails > div > div.w-100.fl.w-60-ns.pv3-ns.pr0 > ul > li.db.dib-ns.mr7-ns.mb5.mb0-ns");
						
						let hasButton: any = document?.querySelector(".vtex-my-orders-app-3-x-orderDetails a.btnTradeProd");

						if (!hasButton)
							elParent?.prepend(elLink);
					})
	
				
			}, 2500);
		})
	}

	useEffect(() => {
		
		makeBtn();

		addEventListener("hashchange", () => {
			makeBtn()
		})
		
	},[])



	return <></>
	
}

export default BtnTradeProd
