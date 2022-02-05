import { ReactElement } from 'react';

const DynamicGrid = (props: any) => {
  const rowCount = Math.floor(props.children.length / props.cols);
  let index = 0;

  const grid = () => {
    let rows: ReactElement[] = [];
    for (let row = 0; row <= rowCount; row++) {
      rows.push(
        <div className="row" key={`row_${row}`}>
          {createColumns()}
        </div>
      );
    }

    return rows;
  };

  const createColumns = () => {
    const cols: ReactElement[] = [];

    for (let col = 0; col < props.cols; col++) {
      cols.push(
        <div className={`col-md-${12 / props.cols}`} key={`recipe_${index}`}>
          {props.children[index]}
        </div>
      );
      index++;
    }

    return cols;
  };

  return <div className="container">{grid()}</div>;
};

export default DynamicGrid;
