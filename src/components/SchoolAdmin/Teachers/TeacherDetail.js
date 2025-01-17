import React from "react";
import { Link, useParams } from "react-router-dom";
import CITY from "../../vn/CITY.json";
import DISTRICT from "../../vn/DISTRICT.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";

const TeacherDetail = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [gender, setgender] = useState(true);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [placeOfBirth, setplaceOfBirth] = useState("");
  const [workingPosition, setworkingPosition] = useState("");
  const [teachSubject, setteachSubject] = useState("");
  const [username, setusername] = useState("");
  const [nationality, setnationality] = useState("");
  const [listcity, setlistcity] = useState([]);
  const [listsubject, setlistsubject] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);
  const [subjectId, setsubjectId] = useState(1);
  const [messenger, setmessenger] = useState("");
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("subjects");
        console.log({ res });
        setlistsubject(res.data.data.items);

        const { data } = await axios.get(`teachers/${id}`);
        console.log({ data });
        setfirstName(data.data.teacher.firstName);
        setlastName(data.data.teacher.lastName);
        setgender(data.data.teacher.gender);
        setdateOfBirth(data.data.teacher.dateOfBirth);
        setphone(data.data.teacher.phone);
        setemail(data.data.teacher.email);
        setplaceOfBirth(data.data.teacher.placeOfBirth);
        setstreet(data.data.teacher.street);
        setdistrict(data.data.teacher.district);
        setcity(data.data.teacher.city);
        setworkingPosition(data.data.teacher.workingPosition);
        setteachSubject(data.data.teacher.teachSubject);
        setnationality(data.data.teacher.nationality);
        setusername(data.data.teacher.username);
        setsubjectId(
          res.data.data.items?.find((element) => {
            return element.subject === data.data.teacher.teachSubject;
          })?.subjectId
        );
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setlistcity(CITY);
        setlistdistrict(DISTRICT);
      } catch (e) {}
    })();
  }, []);
  const setadd = async (code) => {
    const c = listcity.find((item) => item.code === code);
    setcity(c.name);

    const d = DISTRICT.filter((item) => item.parent_code === code);
    setlistdistrict(d);
  };
  const save = async (e) => {
    e.preventDefault();

    const response = await axios.put(`teachers/${id}`, {
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      gender,
      phone,
      email,
      street,
      district,
      city,
      nationality,
      workingPosition,
      subjectId,
      roleId: 3,
    });
    if (response.status === 200) {
      alert("Thành công.");

      setmessenger("");
    } else {
      alert("Thất bại.");
      //console.log(response.response.data.errorDTOs);
      setmessenger(
        `Lỗi: ${response.response.data.errorDTOs[0].key}: ${response.response.data.errorDTOs[0].value}`
      );
    }
  };
  return (
    <>
      <h2 className="text-center"> Thông tin giáo viên</h2>
      <div className="container rounded bg-white mt-2 mb-2">
        <form className="row m-5" onSubmit={save}>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <b>Họ</b>
                <input
                  type="text"
                  maxlength="100"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <b>Tên</b>
                <input
                  type="text"
                  maxlength="100"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-7">
                <b>Ngày Sinh</b>
                <input
                  type="date"
                  className="form-control"
                  value={dateOfBirth}
                  onChange={(e) => setdateOfBirth(e.target.value.toString())}
                />
              </div>

              <div className="col-md-7">
                <b>Giới tính</b>
                <CFormSelect
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value={true}>Nam</option>
                  <option value={false}>Nữ</option>
                </CFormSelect>
              </div>
              <div className="col-md-12">
                <b> Quê quán</b>
                <input
                  type="text"
                  maxlength="100"
                  className="form-control"
                  value={placeOfBirth}
                  onChange={(e) => setplaceOfBirth(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <b>Số điện thoại</b>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <b>Email</b>
                <input
                  type="email"
                  maxlength="100"
                  className="form-control"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <b>Tài khoản hệ thống</b>
                <input
                  type="text"
                  maxlength="100"
                  className="form-control"
                  value={username}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-12">
              <b>Địa chỉ</b>
              <input
                type="text"
                maxlength="100"
                className="form-control"
                value={street}
                onChange={(e) => setstreet(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <b>Quận/Huyện</b>
              <CFormSelect
                value={district}
                onChange={(e) => setdistrict(e.target.value)}
              >
                {listdistrict.map((item) => (
                  <option value={item.name} label={item.name}></option>
                ))}
              </CFormSelect>
            </div>
            <div className="col-md-6">
              <b>Tỉnh/Thành phố</b>
              <CFormSelect
                value={listcity.find((item) => item.name === city)?.code}
                onChange={(e) => setadd(e.target.value)}
              >
                {listcity.map((item) => (
                  <option value={item.code} label={item.name}></option>
                ))}
              </CFormSelect>
            </div>

            <div className="col-md-12">
              <b>Quốc tịch</b>
              <input
                type="text"
                maxlength="100"
                className="form-control"
                value={nationality}
                onChange={(e) => setnationality(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <b>Chức vụ</b>
              <input
                type="text"
                maxlength="100"
                className="form-control"
                value={"Giáo viên"}
                readOnly
              />
            </div>

            <div className="col-md-12">
              <b>Bộ môn</b>
              <CFormSelect
                value={teachSubject}
                onChange={(e) => {
                  setteachSubject(e.target.value);

                  setsubjectId(
                    listsubject?.find((element) => {
                      return element.subject === e.target.value;
                    })?.subjectId
                  );
                }}
              >
                <option value="Maths">Toán</option>
                <option value="Literature">Văn học</option>
                <option value="English">Tiếng Anh</option>
                <option value="Physic">Vật lí</option>
                <option value="Chemistry">Hóa học</option>
                <option value="Biological">Sinh học</option>
                <option value="History">Lịch sử</option>
                <option value="Geographic">Địa lí</option>
                <option value="Civic Education">Giáo dục công dân</option>
                <option value="Physical Education">Thể dục</option>
                <option value="Defense Education">
                  Giáo dục Quốc phòng- An ninh
                </option>
                <option value="Informatics">Tin học</option>
                <option value="Technology">Công nghệ</option>
              </CFormSelect>
            </div>
          </div>
          <div className="text-end" style={{ color: "red" }}>
            {" "}
            {messenger}
          </div>
          <div className="mt-5 text-center">
            <button className="btn btn-primary " type="submit">
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TeacherDetail;
