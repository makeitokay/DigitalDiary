import {
    ANNOUNCEMENT_PAGE_ROUTE, DAY_JOURNAL,
    DIARY_PAGE_ROUTE, JOURNAL_PAGE_ROUTE,
    REGISTRATION_ROUTE, REPORT_QUARTER_PAGE_ROUTE, SCHOOL_CREATE,
    SETTINGS_PAGE_ROUTE, STATISTIC_PAGE_ROUTE
} from "./utils/Const";
import AuthPage from "./pages/commonPages/AuthPage";
import AnnouncementPage from "./pages/commonPages/AnnouncementPage";
import JournalPage from "./pages/JournalPage";
import SettingPage from "./pages/adminPages/SettingPage";
import StatisticPage from "./pages/adminPages/StatisticPage";
import QuarterReportPage from "./pages/parentOrStudentPages/QuarterReportPage";
import DiaryPage from "./pages/parentOrStudentPages/DiaryPage";
import DayJournalPage from "./pages/DayJournalPage";
import CreateSchoolPage from "./pages/commonPages/CreateSchoolPage";

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
    },
    {
        path : DAY_JOURNAL,
        Component: DayJournalPage
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
    },
    {
        path : DAY_JOURNAL,
        Component: DayJournalPage
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
    },
    {
        path: SCHOOL_CREATE,
        Component: CreateSchoolPage
    }
]