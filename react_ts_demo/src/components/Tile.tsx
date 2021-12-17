import React from "react";

interface Props {
  title: string;
}

const TitleCom: React.FC<Props> = ({ title }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = function (
    e: React.ChangeEvent
  ) {
    // type React.ChangeEventHandler<T = Element> = (event: React.ChangeEvent<T>) => void
    console.log(e);
    console.log("handleChange");
  };

  return (
    <>
      <input type="text" placeholder="请输入字符" onChange={handleChange} />
      <h1>{title}</h1>
    </>
  );
};

export default TitleCom;
