const BASE_URL = process.env.REACT_APP_BASE_URL;

const API_PATHS_ADMIN = {
  LOGIN: `${BASE_URL}/account/admin_login`,
  REPORT: `${BASE_URL}/report/admin_report`,
  USER_MANAGEMENT_LIST: `${BASE_URL}/user_management/list_users`,
  USER_MANAGEMENT_GET_USER: `${BASE_URL}/user_management`,
  USER_MANAGEMENT_UPDATE_USER: `${BASE_URL}/user_management`,
  USER_MANAGEMENT_CREATE_ADMIN: `${BASE_URL}/user_management/create_new_admin`,
  USER_MANAGEMENT_DELETE_USER: `${BASE_URL}/user_management`,
  HISTORY: `${BASE_URL}/history/all_history`,
  HISTORY_DETAIL: `${BASE_URL}/history`,
};

const API_PATHS_USER = {
  LOGIN: `${BASE_URL}/account/user_login`,
  REGISTER: `${BASE_URL}/account/signup`,
  REPORT: `${BASE_URL}/report/user_report`,
  HISTORY: `${BASE_URL}/history/user_history`,
  HISTORY_DETAIL: `${BASE_URL}/history`,
};

const API_PATHS = {
  REGISTER: `${BASE_URL}/account/signup`,
  FILE_UPLOAD: `${BASE_URL}/prediction/file_upload`,
  PROFILE: `${BASE_URL}/account/profile`,
  UPDATE_PROFILE: `${BASE_URL}/account/update_profile`,
  LOGIN: `${BASE_URL}/api/auth/login`,
};

export { BASE_URL, API_PATHS, API_PATHS_ADMIN, API_PATHS_USER };
