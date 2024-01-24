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
  randomId,
} from "@mui/x-data-grid-generator";

import Title from "../components/Title";
import inventoryService from '../../services/inventoryServices'

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

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleAddRecord = async () => {
    const id = randomId();

    const data = await inventoryService.create({
      id,
      name: "",
      price: 0,
      quantity: 0,
      threshold: 0,
      expiration: randomCreatedDate(),
      isNew: true,
    })

    setRows((oldRows) => [
      ...oldRows,
      data
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
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRecord}>
        Add record
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

function calculateAvailabilityStatus(qty, threshold) {
  if (qty > threshold * 2) {
    return "In-stock";
  } else if (qty >= threshold) {
    return "Low-stock";
  } else {
    return "Out of stock";
  }
}

function Inventory(props) {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows, setRows] = useState([])

  useEffect(() => {
    async function fetchInventories() {
      const data = await inventoryService.list()
      setRows(data)
    }
    fetchInventories()
  },[])

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

  const handleDeleteClick = (id) => async () => {
    await inventoryService._delete(id)
    const updatedInventories = await inventoryService.list()
    setRows(updatedInventories.filter((row) => row.id !== id));
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

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    await inventoryService.update({
      id: updatedRow?._id,
      payload: {
        ...updatedRow
      }
    })
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "name",
      headerName: "Product",
      width: 150,
      editable: true,
      type: "text",
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
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
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
      field: "expiration",
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
      getActions: (props) => {
        const isInEditMode = rowModesModel[props?.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(props?.id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(props?.id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(props?.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(props?.row?._id)}
            color="inherit"
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
          <Title>Inventory</Title>
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