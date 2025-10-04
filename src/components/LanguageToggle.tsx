import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LanguageToggle = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from("profiles")
      .select("preferred_language")
      .eq("id", session.user.id)
      .single();

    if (data?.preferred_language) {
      setLanguage(data.preferred_language);
    }
  };

  const toggleLanguage = async () => {
    const newLanguage = language === "en" ? "hi" : "en";
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from("profiles")
      .update({ preferred_language: newLanguage })
      .eq("id", session.user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setLanguage(newLanguage);
      toast({
        title: "Language Updated",
        description: `Switched to ${newLanguage === "en" ? "English" : "हिंदी"}`,
      });
    }
  };

  return (
    <Button
      className="bg-[#fdc921] border-[#fdc921] hover:bg-[#fdca21dc] hover:scale-105 transition-all text-black"
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
    >
      <Globe className="mr-2 h-4 w-4 " />
      {language === "en" ? "English" : "हिंदी"}
    </Button>
  );
};

export default LanguageToggle;
