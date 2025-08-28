import { Eye, Pen, Trash } from "lucide-react"
import { Badge } from "../ui/badge"
import { Switch } from "../ui/switch"
import { TableCell, TableRow } from "../ui/table"
import type { Video } from "@/interfaces/video"
import { sinceDateFormat } from "@/utils/sinceDateFormat"
const VideoTableRow = ({video}: {video: Video}) => {
  return (
    <TableRow>
        <TableCell>
            <Switch checked={video.isPublished} />
        </TableCell>
        <TableCell>
            <Badge variant={video.isPublished ? "secondary" : "destructive"} className="text-[16px]">{video.isPublished ? "Published" : "Unpublished"}</Badge>
        </TableCell>
        <TableCell>
            <div className="w-full mx-auto flex gap-2 items-center">
                <img src={video.thumbnail} alt={video.title} className="h-10 min-w-10 w-10 rounded-full object-cover object-top"/>
                <h3 className="text-[16px] font-semibold">{video.title}</h3>
            </div>
        </TableCell>
        <TableCell>
            <div className="w-fit mx-auto flex items-center gap-2">
                <Eye className="text-primary"/>
                <p className="text-lg">{video.views}</p>
            </div>
        </TableCell>
        <TableCell>
            <p className="text-lg">{sinceDateFormat(video.createdAt)}</p>                
        </TableCell>
        <TableCell>
            <div className="w-fit mx-auto flex items-center gap-6">
                    <button className="cursor-pointer"><Trash/></button>
                    <button className="cursor-pointer"><Pen/></button>
                </div>
        </TableCell>
    </TableRow>
  )
}

export default VideoTableRow
