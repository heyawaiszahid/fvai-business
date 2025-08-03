"use client";

import Avatar from "@/Components/Icons/Avatar";
import Radio from "@/Components/Icons/Radio";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import Typography from "@/Components/UI/Typography";
import { useEffect, useState } from "react";

export default function EmployeesList({ onAssign, isAssignDisabled }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeClick = (employeeId) => {
    setSelectedEmployee(employeeId === selectedEmployee ? null : employeeId);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-[275px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-[275px]">
          <Typography size="body2" className="text-red mb-4">
            {error}
          </Typography>
        </div>
      );
    }

    if (filteredEmployees.length === 0) {
      return (
        <div className="flex justify-center items-center h-[275px]">
          <Typography size="body2" className="text-pale-blue">
            {searchTerm ? "No matching employees found" : "No employees available"}
          </Typography>
        </div>
      );
    }

    return (
      <div className="h-[275px] overflow-y-auto">
        <ul className="mb-6 border-pale-blue border-t-[1px]">
          {filteredEmployees.map((employee) => (
            <li
              key={employee.id}
              className="flex justify-between items-center px-2 py-3 border-pale-blue border-b-[1px] cursor-pointer"
              onClick={() => handleEmployeeClick(employee.id)}
            >
              <div className="flex items-center gap-2">
                <Avatar bg="white" className="w-[56px] h-[56px] rounded-[10px]" />
                <div>
                  <Typography size="body2" className="text-pale-blue">
                    {employee.email}
                  </Typography>
                </div>
              </div>
              <Radio active={selectedEmployee === employee.id} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search employees"
        inputClassName="px-4 py-2"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelectedEmployee(null);
        }}
        disabled={loading || !!error}
      />

      {renderContent()}

      <div className="flex justify-center">
        <Button
          className="w-[160px] py-3 mb-6"
          onClick={() => onAssign(selectedEmployee)}
          disabled={isAssignDisabled || !selectedEmployee}
        >
          Assign
        </Button>
      </div>
    </div>
  );
}
