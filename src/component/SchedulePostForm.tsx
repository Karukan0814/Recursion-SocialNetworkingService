import React, { useEffect, useState } from "react";
import "../style/SchedulePostForm.css";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";

type Props = {
  setPostSchedule: React.Dispatch<React.SetStateAction<Date | undefined>>;
  handleClose: () => void;
  postSchedule?: Date;
};
type FormData = {
  dateTime: string;
};
const SchedulePostForm = ({
  postSchedule,
  setPostSchedule,
  handleClose,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    const hours = `${now.getHours()}`.padStart(2, "0");
    const minutes = `${now.getMinutes()}`.padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const [loading, setLoading] = useState(false);
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    setValue("dateTime", getCurrentDateTimeLocal());
    // ユーザーのタイムゾーンを取得
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);
  }, []);
  const onSubmit = async (data: FormData) => {
    const dateTime = new Date(data.dateTime); //StringをDate型に変換※ブラウザのローカルタイムゾーンを使用することに注意！！！
    setPostSchedule(dateTime);
    handleClose();
  };

  return (
    <>
      <div className="login-form">
        <h1>Set Post Schedule</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="dateTime">Post datetime: </label>
            <input
              type="datetime-local"
              id="dateTime"
              {...register("dateTime", { required: " is required" })}
            />
            {errors.dateTime && <p>{errors.dateTime.message}</p>}
          </div>
          <div>Timezone: {timezone}</div>

          <div className="loginButton_container">
            <PrimaryButton
              loading={loading}
              text={"Set"}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SchedulePostForm;
