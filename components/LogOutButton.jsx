
"use client"

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";  // <-- use sonner's toast directly
import { useRouter } from "next/navigation";
//import { logOutAction } from "@/app/actions/logout"; // import your action properly

function LogOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      router.push(`/?toastType=logOut`);
    } else {
      toast.error(errorMessage);
    }

    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogOut}
      disabled={loading}
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;

// import { Loader2 } from "lucide-react";
// import { Button } from "./ui/button";
// import { useState } from "react";
// //import { useToast } from "../hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner"; 
// //import LogOutButton from "./LogOutButton"; 
// //import { logOutAction } from "@/app/actions/logout" 

// function LogOutButton() {
//   const { toast } = useToast();
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   const handleLogOut = async () => {
//     setLoading(true);

//     const { errorMessage } = await logOutAction();

//     if (!errorMessage) {
//       router.push(`/?toastType=logOut`);
//     } else {
//       toast({
//         title: "Error",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     }

//     setLoading(false);
//   };

//   return (
//     <Button
//       variant="outline"
//       onClick={handleLogOut}
//       disabled={loading}
//       className="w-24"
//     >
//       {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
//     </Button>
//   );
// }

// export default LogOutButton;
