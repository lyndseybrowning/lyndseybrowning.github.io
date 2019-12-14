import { useEffect } from "react";
import { APP_TITLE } from "scripts/config";

const useDocumentTitle = title => {
    useEffect(() => {
        document.title = `${APP_TITLE}: ${title}`;
    }, [title]);
};

export default useDocumentTitle;
