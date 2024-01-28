import React from "react";

function Shortcuts() {
  return (
    <div className="new-container">
        <div className="new-header">
            میانبر های بخش مشتریان
        </div>
      <div className="shortcuts-container">
        <div className="new-header shortcut-item">
          <div>جستوجو</div>
          <div>Ctrl + F</div>
        </div>
        <div className="new-header shortcut-item">
          <div>مشتری جدید</div>
          <div>Ctrl + E</div>
        </div>
        <div className="new-header shortcut-item">
          <div>اطلاعات مشتری</div>
          <div>Ctrl + 1</div>
        </div>
        <div className="new-header shortcut-item">
          <div>سفارش جدید</div>
          <div>Ctrl + 2</div>
        </div>
        <div className="new-header shortcut-item">
          <div>سفارشات</div>
          <div>Ctrl + 3</div>
        </div>
        <div className="new-header shortcut-item">
          <div>چاپ (بخش سفارش جدید)</div>
          <div>Ctrl + P</div>
        </div>
      </div>
    </div>
  );
}

export default Shortcuts;
