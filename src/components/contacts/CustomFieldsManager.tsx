import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";

interface CustomField {
  id?: string;
  name: string;
  type: "text" | "number" | "date" | "dropdown";
  options?: string[];
  created_at?: string;
}

export default function CustomFieldsManager() {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newField, setNewField] = useState<CustomField>({
    name: "",
    type: "text",
    options: [],
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<CustomField | null>(null);
  const [optionInput, setOptionInput] = useState("");

  useEffect(() => {
    fetchCustomFields();
  }, []);

  async function fetchCustomFields() {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("custom_fields")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFields(data as CustomField[]);
    } catch (err: any) {
      setError("Error loading custom fields: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCustomField() {
    try {
      setError(null);

      // Validate field name
      if (!newField.name.trim()) {
        setError("Field name is required");
        return;
      }

      // Check for duplicate field names
      if (
        fields.some(
          (field) => field.name.toLowerCase() === newField.name.toLowerCase(),
        )
      ) {
        setError("A field with this name already exists");
        return;
      }

      // For dropdown type, ensure we have options
      if (
        newField.type === "dropdown" &&
        (!newField.options || newField.options.length === 0)
      ) {
        setError("Dropdown fields require at least one option");
        return;
      }

      const { error } = await supabase.from("custom_fields").insert([
        {
          name: newField.name,
          type: newField.type,
          options: newField.type === "dropdown" ? newField.options : null,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setIsAddDialogOpen(false);
      setNewField({ name: "", type: "text", options: [] });
      setOptionInput("");
      fetchCustomFields();
    } catch (err: any) {
      setError("Error adding custom field: " + err.message);
    }
  }

  async function updateCustomField() {
    try {
      setError(null);

      if (!editingField) return;

      // Validate field name
      if (!editingField.name.trim()) {
        setError("Field name is required");
        return;
      }

      // Check for duplicate field names (excluding the current field)
      if (
        fields.some(
          (field) =>
            field.id !== editingField.id &&
            field.name.toLowerCase() === editingField.name.toLowerCase(),
        )
      ) {
        setError("A field with this name already exists");
        return;
      }

      // For dropdown type, ensure we have options
      if (
        editingField.type === "dropdown" &&
        (!editingField.options || editingField.options.length === 0)
      ) {
        setError("Dropdown fields require at least one option");
        return;
      }

      const { error } = await supabase
        .from("custom_fields")
        .update({
          name: editingField.name,
          type: editingField.type,
          options:
            editingField.type === "dropdown" ? editingField.options : null,
        })
        .eq("id", editingField.id);

      if (error) throw error;

      setIsEditDialogOpen(false);
      setEditingField(null);
      setOptionInput("");
      fetchCustomFields();
    } catch (err: any) {
      setError("Error updating custom field: " + err.message);
    }
  }

  async function deleteCustomField(id: string) {
    if (
      !confirm(
        "Are you sure you want to delete this custom field? This will remove the field from all contacts.",
      )
    ) {
      return;
    }

    try {
      setError(null);

      const { error } = await supabase
        .from("custom_fields")
        .delete()
        .eq("id", id);

      if (error) throw error;

      fetchCustomFields();
    } catch (err: any) {
      setError("Error deleting custom field: " + err.message);
    }
  }

  function addOption() {
    if (!optionInput.trim()) return;

    if (isEditDialogOpen && editingField) {
      const updatedOptions = [
        ...(editingField.options || []),
        optionInput.trim(),
      ];
      setEditingField({ ...editingField, options: updatedOptions });
    } else {
      const updatedOptions = [...(newField.options || []), optionInput.trim()];
      setNewField({ ...newField, options: updatedOptions });
    }

    setOptionInput("");
  }

  function removeOption(index: number) {
    if (isEditDialogOpen && editingField) {
      const updatedOptions = [...(editingField.options || [])];
      updatedOptions.splice(index, 1);
      setEditingField({ ...editingField, options: updatedOptions });
    } else {
      const updatedOptions = [...(newField.options || [])];
      updatedOptions.splice(index, 1);
      setNewField({ ...newField, options: updatedOptions });
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Custom Fields</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Field
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Field</DialogTitle>
              <DialogDescription>
                Create a new custom field for your contacts.
              </DialogDescription>
            </DialogHeader>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="field-name">Field Name</Label>
                <Input
                  id="field-name"
                  value={newField.name}
                  onChange={(e) =>
                    setNewField({ ...newField, name: e.target.value })
                  }
                  placeholder="e.g., Birthday, Industry, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field-type">Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value: any) =>
                    setNewField({ ...newField, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="dropdown">Dropdown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newField.type === "dropdown" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="option">Add Options</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="option"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                        placeholder="Enter an option"
                      />
                      <Button type="button" onClick={addOption}>
                        Add
                      </Button>
                    </div>
                  </div>

                  {newField.options && newField.options.length > 0 && (
                    <div className="space-y-2">
                      <Label>Options</Label>
                      <div className="border rounded-md p-2 space-y-1">
                        {newField.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-muted rounded-sm"
                          >
                            <span>{option}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeOption(index)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={addCustomField}>Add Field</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Custom Field</DialogTitle>
              <DialogDescription>
                Modify this custom field for your contacts.
              </DialogDescription>
            </DialogHeader>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {editingField && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-field-name">Field Name</Label>
                  <Input
                    id="edit-field-name"
                    value={editingField.name}
                    onChange={(e) =>
                      setEditingField({ ...editingField, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-field-type">Field Type</Label>
                  <Select
                    value={editingField.type}
                    onValueChange={(value: any) =>
                      setEditingField({ ...editingField, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {editingField.type === "dropdown" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-option">Add Options</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="edit-option"
                          value={optionInput}
                          onChange={(e) => setOptionInput(e.target.value)}
                          placeholder="Enter an option"
                        />
                        <Button type="button" onClick={addOption}>
                          Add
                        </Button>
                      </div>
                    </div>

                    {editingField.options &&
                      editingField.options.length > 0 && (
                        <div className="space-y-2">
                          <Label>Options</Label>
                          <div className="border rounded-md p-2 space-y-1">
                            {editingField.options.map((option, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-2 bg-muted rounded-sm"
                              >
                                <span>{option}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeOption(index)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={updateCustomField}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Options</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : fields.length > 0 ? (
                fields.map((field) => (
                  <TableRow key={field.id}>
                    <TableCell className="font-medium">{field.name}</TableCell>
                    <TableCell className="capitalize">{field.type}</TableCell>
                    <TableCell>
                      {field.type === "dropdown" && field.options
                        ? field.options.join(", ")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingField(field);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            field.id && deleteCustomField(field.id)
                          }
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No custom fields found. Add your first custom field to get
                    started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
