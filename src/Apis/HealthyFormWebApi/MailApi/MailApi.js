import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

const SendMailContract = (formContract) => {
  return HealthyFormWebApi().post(`/contract-doctor`, formContract);
};

export { SendMailContract };
