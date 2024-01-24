import React from "react";
import { useEffect, useState } from "react";
import { Button, Chip, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";
import Title from "../components/Title";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
/*---------------------------------------------Endline of import------------------ */

/*--------------------------------------------Start here Const Out of the function-------- */

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Inventory Management System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};
const rows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    date: randomCreatedDate(),
    role: randomRole(),
  },
];
/*------------------------------------------------------Start here Edit Toolbar---------------------------- */
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: "",
        price: 0,
        qty: 0,
        threshold: 0,
        date: randomCreatedDate(),
        isNew: true,
      },
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };
  return (
    <GridToolbarContainer sx={{ gap: 5 }}>
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <Button color="primary" startIcon={<DeleteIcon />}>
        Delete All
      </Button>

      <GridToolbarExport
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
      />
    </GridToolbarContainer>
  );
}

/*------------------------------------- calculate Availability Status ---------------------- */
function calculateAvailabilityStatus(qty, threshold) {
  if (qty > threshold * 2) {
    return "In-stock";
  } else if (qty >= threshold) {
    return "Low-stock";
  } else {
    return "Out of stock";
  }
}
/*-----------------------------------------Start here Main Function---------------- */
function Inventory() {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows, setRows] = useState(() => {
    try {
      const storedRows = localStorage.getItem("rows");
      return storedRows ? JSON.parse(storedRows) : [];
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      localStorage.setItem("rows", JSON.stringify(rows));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [rows]);

  React.useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows));
  }, [rows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  /*--------------------------------------------start here Const Columns ---------------------------------------------- */

  const columns = [
    {
      field: "name",
      headerName: "Product",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Small", "Medium", "Large"],
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      cellClassName: "number",
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span placeholder="Amount" style={{ marginRight: "5px" }}>
            ₱
          </span>
          {params.value}
        </div>
      ),
    },
    {
      field: "qty",
      headerName: "Quantity",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      cellClassName: "number",
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span placeholder="Amount" style={{ marginRight: "5px" }}>
            ₱
          </span>
          {params.value}
        </div>
      ),
    },
    {
      field: "threshold",
      headerName: "Threshold Value",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "date",
      headerName: "Expiry Date",
      type: "date",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
      valueGetter: (params) => {
        // Assuming params.value is the date string, modify this accordingly
        // Convert the value to a Date object
        return new Date(params.value);
      },
    },
    {
      field: "status",
      headerName: "Availability",
      width: 160,
      editable: true,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const status = calculateAvailabilityStatus(
          params.row.qty,
          params.row.threshold
        );
  
        switch (status) {
          case "In-stock":
            return <Chip label={status} color="success" />;
          case "Out of stock":
            return <Chip label={status} color="error" />;
          case "Low-stock":
            return <Chip label={status} color="warning" />;
          default:
            return <Chip label="Unknown" color="default" />;
        }
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
              key={`save_${id}`} // Added key prop
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              key={`cancel_${id}`} // Added key prop
            />,
          ];
        }
  
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
            key={`edit_${id}`} // Added key prop
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key={`delete_${id}`} // Added key prop
          />,
        ];
      },
    },
  ];
  
  return (
    <>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <Title>Orders</Title>
          {/*---------------------------------------------------Start Here DataGrid-------------------------------------------*/}
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            checkboxSelection
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
      </Paper>
      <Copyright sx={{ pt: 4 }} />
    </>
  );
}

export default Inventory;
