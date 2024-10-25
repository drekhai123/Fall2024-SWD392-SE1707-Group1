import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { UpdateHealthDialog } from "./UpdateHealthDialog";

export function FishList() {
  const fishes = [
    {
      id: 1,
      species: "Goldfish",
      quantity: 10,
      health_status: "Good",
    },
    {
      id: 2,
      species: "Betta",
      quantity: 5,
      health_status: "Good",
    },
    {
      id: 3,
      species: "Guppy",
      quantity: 20,
      health_status: "Good",
    },
  ];

  const [selectedFish, setSelectedFish] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const confirmOrder = (order) => {
    setSelectedFish(order);
    setShowConfirmDialog(true);
  };

  const handleConfirm = (confirmationData) => {
    console.log("Fish edited:", confirmationData);
  };

  return (
    <div>
      <DataTable
        value={fishes}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" header="Order Id"></Column>
        <Column field="species" header="Species"></Column>
        <Column field="quantity" header="Quantity"></Column>
        <Column field="health_status" header="Health Status"></Column>
        <Column
          field="id"
          header="Action"
          body={(rowData) => {
            return (
              <Button
                label="Update Health"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => confirmOrder(rowData)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>

      {selectedFish && (
        <UpdateHealthDialog
          fish={selectedFish}
          visible={showConfirmDialog}
          onHide={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
