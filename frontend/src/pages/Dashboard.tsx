import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Eye, Heart, Plus, User, X } from "lucide-react"
import {VideoUploadDialog} from "../components/index.ts"
import { useState } from "react"

const Dashboard = () => {

  const [isOpen, setIsOpen] = useState(false)

  const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

  return (
    <div className="relative text-white w-full h-screen my-10 md:my-4 px-4">
      <div className="flex items-center justify-between md:mb-4 mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="md:text-3xl text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm">Here you can manage your account, view your activity, and more.</p>
        </div>
            <button className="flex items-center gap-x-1 bg-primary text-black hover:bg-accent py-2 px-4 cursor-pointer font-semibold text-shadow-lg"
            onClick={()=>setIsOpen(!isOpen)}
            >
              {isOpen? <X/> : (
                <>
                  <Plus/>
                  <span>Upload video</span>
                </>
              )}
            </button>
          {isOpen && <VideoUploadDialog/>}
      </div>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="border p-3 flex flex-col justify-between">
          <div className="bg-primary w-fit p-1 rounded-full mb-6">
            <Eye/>
          </div>
          <div>
            <p>Total Views</p>
            <h2 className="text-3xl md:text-4xl font-semibold">1,234</h2>
          </div>
        </div>
        <div className="border p-3 flex flex-col justify-between">
          <div className="bg-primary w-fit p-1 rounded-full mb-6">
            <User/>
          </div>
          <div>
            <p>Total Subscribers</p>
            <h2 className="text-3xl md:text-4xl font-semibold">1,234</h2>
          </div>
        </div>
        <div className="border p-3 flex flex-col justify-between">
          <div className="bg-primary w-fit p-1 rounded-full mb-6">
            <Heart/>
          </div>
          <div>
            <p>Total Likes</p>
            <h2 className="text-3xl md:text-4xl font-semibold">1,234</h2>
          </div>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date Uploaded</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index}>  
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>2023-10-01</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Dashboard