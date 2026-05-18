import React, { useEffect } from "react";

import waitForEl from "../../utils/waitForEl";

const LogoRedirect = () => {
	function makeLogo() {
		waitForEl(".vtex-flex-layout-0-x-flexRowContent--header-logo", () => {
			setTimeout(() => {
				const logo: any = document?.querySelector(
					".vtex-flex-layout-0-x-flexRowContent--header-logo>.vtex-flex-layout-0-x-stretchChildrenWidth"
				);
				logo.addEventListener(
					"click",
					function () {
						window.location.href = "https://www.brandili.com.br/";
					},
					false
				);
			}, 1500);
		});
	}

	useEffect(() => {
		makeLogo();

		addEventListener("hashchange", () => {
			makeLogo();
		});
	}, []);
	return <></>;
};

export default LogoRedirect;
