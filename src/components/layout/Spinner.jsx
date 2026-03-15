import { memo } from "react";

function Spinner() {
    return (
        <div className="h-lvh w-lvw animate-fade flex justify-center items-center">
            <img src="/img/logo-nuvia-new.webp" alt="spinner" className="size-24 object-contain" />
        </div>
    );
}

export default memo(Spinner);

