import axios from "axios";

const API_BASE_URL = "http://ec2-3-110-169-224.ap-south-1.compute.amazonaws.com:8080";

const endpoints = {
  GET_USER_OTP: "/api/generateUserOtp/",
  GET_ADMIN_OTP: "/api/generateAdminOtp/",
  CUSTOMER_REGISTRATION: "/api/customers/register/",
  CUSTOMER_LOGIN: "/api/customers/login",
  CUSTOMER_LOGOUT: "/auth/logout",
  LOGOUT_COMPLETED: "/api/logout-success",
  ADMIN_REGISTRATION: "/api/manager/register/",
  ADMIN_LOGIN: "/api/manager/login",
  MAIN_PAGE: "/selectEvent/",
  MAIN_PAGE_FILTER: "/selectEvent/filter/",
  ADMIN_PORTAL: "/admin/add-event/findadminbyemail/",
  ADMIN_PORTAL_ADDEVENT: "/admin/add-event/",
  USER_EVENT_COUNT: "/admin/add-event/user-event-count",
  ADMIN_PORTAL_DELETEEVENT: "/admin/add-event/delete/",
  ADMIN_PORTAL_EVENT: "/admin/add-event/getevent/",
  ADMIN_PORTAL_EVENT_IMAGE_POST: "/admin/add-event/upload",
  ADMIN_PORTAL_EVENT_IMAGE_GET: "/admin/add-event/getImages/",
  CURRENT_CUSTOMER: "/customer/current-user",
  CURRENT_ADMIN: "/admin/current-admin",
  CUSTOMER_BOOKING_REQUEST: "/bookings/bookrequest",
  CUSTOMER_BOOKING_REQUEST_TO_ADMIN: "/bookings/receiverequest/",
  ADMIN_RESPONSE_ACCEPT: "/bookings/accept/",
  ADMIN_RESPONSE_REJECT: "/bookings/reject/",
  CUSTOMER_BOOKING_CHAT: "/bookings/bookingRequest/",
  DELETE_CUSTOMER: "/customer/delete-user",
  DELETE_ADMIN: "/admin/delete-admin",
};

class JashanService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  generateUserOtp(mobileNumber) {
    return this.axiosInstance.get(`${endpoints.GET_USER_OTP}${mobileNumber}`);
  }
  
  generateAdminOtp(mobileNumber) {
    return this.axiosInstance.get(`${endpoints.GET_ADMIN_OTP}${mobileNumber}`);
  }
  get_current_user(token) {
    return this.axiosInstance.get(endpoints.CURRENT_CUSTOMER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  get_current_admin(token) {
    return this.axiosInstance.get(endpoints.CURRENT_ADMIN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete_current_user(token) {
    return this.axiosInstance.delete(endpoints.DELETE_CUSTOMER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete_current_admin(token) {
    return this.axiosInstance.delete(endpoints.DELETE_ADMIN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  user_register(user_data,otp) {
    return this.axiosInstance.post(`${endpoints.CUSTOMER_REGISTRATION}${otp}`, user_data);
  }

  user_login(user_login) {
    return this.axiosInstance.post(endpoints.CUSTOMER_LOGIN, user_login);
  }

  user_signout(token) {
    return this.axiosInstance.post(endpoints.CUSTOMER_LOGOUT, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  logOut() {
    return this.axiosInstance.get(endpoints.LOGOUT_COMPLETED);
  }

  admin_register(admin_data,otp) {
    return this.axiosInstance.post(`${endpoints.ADMIN_REGISTRATION}${otp}`, admin_data);
  }

  admin_login(admin_login) {
    return this.axiosInstance.post(endpoints.ADMIN_LOGIN, admin_login);
  }

  get_Events(token) {
    return this.axiosInstance.get(endpoints.MAIN_PAGE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  add_Event(eventData, token) {
    return this.axiosInstance.post(endpoints.ADMIN_PORTAL_ADDEVENT, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete_Event(eventId, token) {
    return this.axiosInstance.delete(
      `${endpoints.ADMIN_PORTAL_DELETEEVENT}${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getUserEventCount(token) {
    return this.axiosInstance.get(endpoints.USER_EVENT_COUNT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  get_EventById(eventId, token) {
    return this.axiosInstance.get(`${endpoints.MAIN_PAGE}${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  get_EventBySecialization(token, specialization) {
    return this.axiosInstance.get(
      `${endpoints.MAIN_PAGE_FILTER}${specialization}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getAdminByEmail(username, token) {
    return this.axiosInstance.get(`${endpoints.ADMIN_PORTAL}${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getEventByAdminId(adminId, token) {
    return this.axiosInstance.get(`${endpoints.ADMIN_PORTAL_EVENT}${adminId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  uploadImages(formData, token) {
    return this.axiosInstance.post(
      endpoints.ADMIN_PORTAL_EVENT_IMAGE_POST,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  getImageById(id, token) {
    return this.axiosInstance.get(
      `${endpoints.ADMIN_PORTAL_EVENT_IMAGE_GET}${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  customer_booking(bookingdata, token) {
    return this.axiosInstance.post(
      endpoints.CUSTOMER_BOOKING_REQUEST,
      bookingdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  customer_booking_requests(id, token) {
    return this.axiosInstance.get(
      `${endpoints.CUSTOMER_BOOKING_REQUEST_TO_ADMIN}${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  acceptBooking(bookingId, token) {
    return this.axiosInstance.get(
      `${endpoints.ADMIN_RESPONSE_ACCEPT}${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  rejectBooking(bookingId, token) {
    return this.axiosInstance.get(
      `${endpoints.ADMIN_RESPONSE_REJECT}${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getBookingsInfo(Id, token) {
    return this.axiosInstance.get(`${endpoints.CUSTOMER_BOOKING_CHAT}${Id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new JashanService();
