import { Table, Button } from "reactstrap";
import "../../styles/Styles/index.scss";
/**
 * @param {Array} headers
 * @param {Array} body
 * @param {Array} buttons {className, event, name, options }
 */
export const DataTable = (props) => {
  const {
    headers,
    body,
    parentCallBack,
    buttons,
    parentCallBackUpdate,
    buttonView,
    buttonDelete,
    buttonUpdate,
    noFunctionTable
  } = props;

  const handleDeleteEvent = (id) => {
    parentCallBack(id);
  };

  const handleEvent = (id) => {
    buttons.event(id);
  };
  const OnClickUpdate = (id) => {
    parentCallBackUpdate(id);
  };

  return (
    <div className="table-responsive df-h-30 responsiveTable">
      <Table
        className="serviceListTable table-head-fixed"
        hover
        bordered
        striped
      >
        <thead>
          <tr align="center">
            {headers.map((h) => (
              <th>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((data, index) => {
            return (
              <tr key={data.id}>
                {noFunctionTable&& Object.keys(data, index)
                  .filter((d) => d !== "id" && d !== "ctime")
                  .map((str) => data[str])
                  .map((dt, i, array) => {
                    return <th style={{fontWeight:400}} scope="row">{dt}</th>
                  })}
                  {
                    !noFunctionTable&&Object.keys(data, index)
                    .filter((d) => d !== "id" && d !== "ctime")
                    .map((str) => data[str])
                    .map((dt, i, array) => {
                      return i === +0 ? (
                        <th scope="row">{dt}</th>
                      ) : i === array.length - 1 ? (
                        <td className="text-center">
                          {buttonUpdate && (
                            <Button
                              style={{ backgroundColor: "rgb(0, 30, 60)" }}
                              onClick={() => OnClickUpdate(data.id)}
                            >
                              Sửa
                            </Button>
                          )}{" "}
                          &nbsp;
                          {buttonView && (
                            <Button
                              style={{ backgroundColor: "rgb(0, 30, 60)" }}
                              onClick={() => OnClickUpdate(data.id)}
                            >
                              Xem
                            </Button>
                          )}{" "}
                          &nbsp;
                          {buttonDelete && (
                            <Button
                              color="danger"
                              onClick={() => handleDeleteEvent(data.id)}
                            >
                             {buttonDelete}
                            </Button>
                          )}{" "}
                          &nbsp;
                          {buttons && buttons.options ? (
                            <Button
                              color="primary"
                              onClick={() => handleEvent(data.id)}
                            >
                              {buttons.name}
                            </Button>
                          ) : null}
                        </td>
                      ) : (
                        <td>{dt}</td>
                      );
                    })
                  }
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
