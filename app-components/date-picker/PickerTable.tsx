import React, { useState } from "react";
import { Month } from "./Month";
import moment from "moment";

const countYearMonth = ({ year, month }: { year: number; month: number }) => {
  let temp: { year: number; month: number } = {
    year,
    month,
  };

  if (month < 0) {
    temp = {
      year: year - 1,
      month: 11,
    };
  }

  if (month > 11) {
    temp = {
      year: year + 1,
      month: 0,
    };
  }

  return temp;
};

export function PickerTable({ onSelect }: { onSelect: (val: any) => void }) {
  const current = {
    month: moment().month(),
    year: moment().year(),
  };
  const [monthDate, setMonthDate] = useState({
    year: current.year,
    month: current.month,
  });

  return (
    <div>
      <button
        onClick={() => {
          setMonthDate(
            countYearMonth({
              year: monthDate.year,
              month: monthDate.month - 1,
            }),
          );
        }}
      >
        prev
      </button>
      <button
        onClick={() => {
          setMonthDate(
            countYearMonth({
              year: monthDate.year,
              month: monthDate.month + 1,
            }),
          );
        }}
      >
        next
      </button>
      <div>{moment([monthDate.year, monthDate.month]).format("YYYY MM")} 月</div>
      <table>
        <thead>
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
        </thead>
        <Month year={monthDate.year} month={monthDate.month} onSelect={onSelect} />
      </table>
    </div>
  );
}
