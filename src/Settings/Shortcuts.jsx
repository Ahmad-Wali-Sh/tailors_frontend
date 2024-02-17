import React from "react";

function Shortcuts() {
  return (
    <div className="new-container">
      <div className="new-header">میانبر های بخش ثبت مشتری</div>
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
      <div className="new-header">میانبر های نوار ناوبری</div>
      <div className="shortcuts-container">
        <div className="new-header shortcut-item">
          <div>ثبت مشتری</div>
          <div>F1</div>
        </div>
        <div className="new-header shortcut-item">
          <div>سفارشات</div>
          <div>F2</div>
        </div>
        <div className="new-header shortcut-item">
          <div>مشتریان</div>
          <div>F3</div>
        </div>
        <div className="new-header shortcut-item">
          <div>گزارش</div>
          <div>F5</div>
        </div>
        <div className="new-header shortcut-item">
          <div>تنظیمات</div>
          <div>F6</div>
        </div>
      </div>
    </div>
  );
}

export default Shortcuts;
