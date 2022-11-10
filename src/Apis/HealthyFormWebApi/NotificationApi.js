import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

const getAllNotifications = (page) => {
  return HealthyFormWebApi().get(`/notifications?page=${page}`);
};

export { getAllNotifications };
