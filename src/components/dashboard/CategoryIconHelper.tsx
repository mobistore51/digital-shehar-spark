
import { 
  Activity, 
  BarChart, 
  Calendar, 
  CheckCircle, 
  Code, 
  Edit, 
  FileText, 
  Shield, 
  ShoppingCart, 
  Star, 
  Users 
} from "lucide-react";

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Content":
      return FileText;
    case "UI":
    case "Design":
      return Edit;
    case "Analytics":
      return BarChart;
    case "SEO":
    case "Marketing":
      return Activity;
    case "Infrastructure":
    case "Performance":
      return CheckCircle;
    case "Media":
      return FileText;
    case "Collaboration":
    case "Client Management":
      return Users;
    case "Security":
      return Shield;
    case "Development":
      return Code;
    case "E-commerce":
      return ShoppingCart;
    case "Organization":
      return Calendar;
    default:
      return Star;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-green-100 text-green-800";
    case "Updated":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
