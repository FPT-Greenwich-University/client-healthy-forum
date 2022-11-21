import HealthySocialWebApi from "@/Apis/HealthyFormWebApi/HealthySocialWebApi";

const getAllNotifications = (page) => {
  return HealthySocialWebApi().get(`/notifications?page=${page}`);
};

export { getAllNotifications };
