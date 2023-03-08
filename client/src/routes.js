import {DIARY_PAGES_ROUTE, MAIN_PAGES_ROUTE, REGISTRATION_ROUTE} from "./utils/Const";
import Auth from "./pages/Auth";
import AnnouncementPage from "./pages/AnnouncementPage";
import JournalPages from "./pages/JournalPages";

export const authRoutes = [
    {
        path : MAIN_PAGES_ROUTE,
        Component: AnnouncementPage
    },
    {
        path : DIARY_PAGES_ROUTE,
        Component: JournalPages
    }
]
export const NotAuthRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]