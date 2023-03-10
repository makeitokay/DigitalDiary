import {
    ANNOUNCEMENT_PAGE_ROUTE,
    DIARY_PAGE_ROUTE, JOURNAL_PAGE_ROUTE,
    REGISTRATION_ROUTE, REPORT_QUARTER_PAGE_ROUTE,
    SETTINGS_PAGE_ROUTE, STATISTIC_PAGE_ROUTE
} from "./utils/Const";
import AuthPage from "./pages/CommonPages/AuthPage";
import AnnouncementPage from "./pages/CommonPages/AnnouncementPage";
import JournalPage from "./pages/JournalPage";
import SettingPage from "./pages/AdminPages/SettingPage";
import StatisticPage from "./pages/AdminPages/StatisticPage";
import QuarterReportPage from "./pages/ParentOrStudentPages/QuarterReportPage";
import DiaryPage from "./pages/ParentOrStudentPages/DiaryPage";

export const authCommonRoutes = [
    {
        path : ANNOUNCEMENT_PAGE_ROUTE,
        Component: AnnouncementPage
    },
    {
        path : SETTINGS_PAGE_ROUTE,
        Component: SettingPage
    },
    {
        path : STATISTIC_PAGE_ROUTE,
        Component: StatisticPage
    },
    {
        path : JOURNAL_PAGE_ROUTE,
        Component: JournalPage
    },
    {
        path : REPORT_QUARTER_PAGE_ROUTE,
        Component: QuarterReportPage
    },
    {
        path : DIARY_PAGE_ROUTE,
        Component: DiaryPage
    }
]
export const adminRoutes = [
    {
        path : ANNOUNCEMENT_PAGE_ROUTE,
        Component: AnnouncementPage
    },
    {
        path : SETTINGS_PAGE_ROUTE,
        Component: SettingPage
    },
    {
        path : STATISTIC_PAGE_ROUTE,
        Component: StatisticPage
    },
    {
        path : JOURNAL_PAGE_ROUTE,
        Component: JournalPage
    }
]
export const teacherRoutes = [
    {
        path : ANNOUNCEMENT_PAGE_ROUTE,
        Component: AnnouncementPage
    },
    {
        path : JOURNAL_PAGE_ROUTE,
        Component: JournalPage
    }
]
export const parentOrStudentRoutes = [
    {
        path : ANNOUNCEMENT_PAGE_ROUTE,
        Component: AnnouncementPage
    },
    {
        path : REPORT_QUARTER_PAGE_ROUTE,
        Component: QuarterReportPage
    },
    {
        path : DIARY_PAGE_ROUTE,
        Component: DiaryPage
    },
]
export const notAuthRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    }
]