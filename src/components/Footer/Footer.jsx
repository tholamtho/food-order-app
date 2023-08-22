import React from "react";
import { ListGroup } from "reactstrap";

import logo from "../../assets/images/res-logo.png";
import "../../styles/footer.css";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="logo" />
        <h5>MyPizza {props.name ? props.name : ""}</h5>
        <p>Pizza tốt nhất trong khu vực của bạn</p>
      </div>
      <div>
        <h5 className="footer__title mb-3">Thời gian giao hàng</h5>
        <ListGroup>
          <div className="delivery__time-item border-0 ps-0">
            <span>Thứ Ba - Thứ Sáu</span>
            <p>10h Sáng - 11h Đêm</p>
          </div>
          <div className="delivery__time-item border-0 ps-0">
            <span>Thứ Tư - Thứ Năm</span>
            <p>Ngày nghỉ</p>
          </div>
        </ListGroup>
      </div>
    </footer>
  );
};

export default Footer;
