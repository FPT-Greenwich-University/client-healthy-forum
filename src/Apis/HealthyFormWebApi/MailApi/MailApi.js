import HealthySocialWebApi from "@/Apis/HealthyFormWebApi/HealthySocialWebApi";

const SendMailContract = (formContract) => {
  return HealthySocialWebApi().post(`/contract-doctor`, formContract);
};

export { SendMailContract };
