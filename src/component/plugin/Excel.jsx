import React from "react";
import XLSX from 'xlsx-js-style';

const Excel = ({data}) => {
    const excelDownLoad = async () => {
        if (!data || data.length === 0) {
            alert('다운로드할 데이터가 없습니다.');
            return;
        }
        try {
            const wb = XLSX.utils.book_new()
            const headerStyle = {
                font: {
                    bold: true,
                    color: {rgb: "FFFFFF"}
                },
                fill: {
                    fgColor: {rgb: "4472C4"}
                },
                alignment: {
                    horizontal: "center",
                    vertical: "center"
                },
                border: {
                    top: {style: "thin"},
                    bottom: {style: "thin"},
                    left: {style: "thin"},
                    right: {style: "thin"}
                }
            };
            const dataStyle = {
                alignment: {
                    horizontal: "center",
                    vertical: "center"
                },
                border: {
                    top: {style: "thin"},
                    bottom: {style: "thin"},
                    left: {style: "thin"},
                    right: {style: "thin"}
                }
            };
            const headers = [
                {v: "요청자", t: "s", s: headerStyle},
                {v: "승인자", t: "s", s: headerStyle},
                {v: "상태", t: "s", s: headerStyle},
                {v: "처리일시", t: "s", s: headerStyle}
            ];

            const excelData = data.map(item => ([
                {v: item.요청자이름, t: "s", s: dataStyle},
                {v: item.승인자이름, t: "s", s: dataStyle},
                {v: item.처리상태화면명, t: "s", s: dataStyle},
                {v: item.처리일시, t: "s", s: dataStyle}
            ]));

            const ws = XLSX.utils.aoa_to_sheet([headers, ...excelData]);

            // 컬럼 넓이 설정
            ws['!cols'] = [
                {wch: 15},
                {wch: 15},
                {wch: 12},
                {wch: 15}
            ];
            // 워크시트를 워크북에 추가
            XLSX.utils.book_append_sheet(wb, ws, "외근요청목록");

            // 파일 다운로드
            XLSX.writeFile(wb, `외근요청목록_${new Date().toISOString().slice(0, 10)}.xlsx`);
            console.log('Excel 파일 생성 및 다운로드 완료');
        } catch (error) {
            console.error('엑셀 다운로드중 에러', error);
        }
    }
    return (
        <button
            onClick={excelDownLoad}
            className="btn btn-primary"
        >
            엑셀 다운로드
        </button>
    )
}
export default Excel;
