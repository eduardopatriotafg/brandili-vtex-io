import React, { useEffect } from "react";
import "./index.css";

const PAGE_NAMES: Record<string, string> = {
    "#/profile": "Meu Perfil",
    "#/orders": "Meus Pedidos",
    "#/addresses": "Meus Endereços",
    "#/cards": "Meus Cartões",
    "#/wishlist": "Favoritos",
    "#/authentication": "Autenticação",
};

const getPageName = (): string => {
    const hash = window.location.hash;
    for (const key of Object.keys(PAGE_NAMES)) {
        if (hash === key || hash.startsWith(key + "/")) {
            return PAGE_NAMES[key];
        }
    }
    return "Minha Conta";
};

const renderBreadcrumb = (): boolean => {
    const target = document.querySelector(".vtex-account");
    if (!target) return false;

    document
        .querySelectorAll(".custom-breadcrumb")
        .forEach(el => el.remove());

    const pageName = getPageName();

    const html = `
        <div class="custom-breadcrumb">
        <a href="/" class="breadcrumb-my-account">Pagina inicial</a>
        <span class="breadcrumb-separator">&gt;</span>
        <p class="breadcrumb-current">${pageName}</p>
        <a href="/" class="custom-back-home myaccount">Página Inicial</a>
        </div>
    `;

    target.insertAdjacentHTML("beforebegin", html);
    return true;
};

const START_DELAY_MS = 1500;

const MyAccountBreadcrumb = () => {
    useEffect(() => {
        let obs: MutationObserver | null = null;

        const handleHashChange = () => {
            renderBreadcrumb();
        };

        const startTimer = window.setTimeout(() => {
            if (!renderBreadcrumb()) {
                obs = new MutationObserver(() => {
                    if (renderBreadcrumb()) {
                        obs?.disconnect();
                    }
                });

                obs.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            }

            window.addEventListener("hashchange", handleHashChange);
        }, START_DELAY_MS);

        return () => {
            window.clearTimeout(startTimer);
            window.removeEventListener("hashchange", handleHashChange);
            obs?.disconnect();
            document
                .querySelectorAll(".custom-breadcrumb")
                .forEach(el => el.remove());
        };
    }, []);

    return <></>;
};

export default MyAccountBreadcrumb;
