"use client";
import { Database } from "@/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  full_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  avatar_url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  bio: z.string().max(300, {
    message: "Bio must be at most 300 characters.",
  }),
  theme: z.string().max(20, {
    message: "Theme must be at most 20 characters.",
  }),
});

export default function AccountForm({ user }: { user: User | null }) {
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<{
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
    bio: string | null;
    theme: string | null;
  }>({
    full_name: "",
    username: "",
    avatar_url: "",
    bio: "",
    theme: "",
  });
  const { full_name, username, avatar_url, bio, theme } = formData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username as string,
      full_name: full_name as string,
      avatar_url: avatar_url as string,
      bio: bio as string,
      theme: theme as string,
    },
  });

  useEffect(() => {
    form.setValue("username", username as string);
    form.setValue("full_name", full_name as string);
    form.setValue("avatar_url", avatar_url as string);
    form.setValue("bio", bio as string);
    form.setValue("theme", theme as string);
  }, [username, full_name, avatar_url, bio, theme]);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, avatar_url, bio, theme`)
        .eq("id", user?.id as string)
        .single();

      if (error && status !== 406) {
        throw error;
      } else if (status === 406) {
        console.log("no data", data);
      }

      if (data) {
        setFormData(data);
        console.log(data);
      } else {
        // No data found, create a new record
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user?.id as string,
          full_name: user?.user_metadata.full_name as string,
          username: user?.id as string,
          avatar_url: user?.user_metadata.avatar_url as string,
          bio: "",
          theme: "system",
        });

        if (insertError) {
          console.error(insertError);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    avatar_url,
    bio,
    theme,
    full_name,
  }: {
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    theme: string | null;
  }) {
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name,
        username,
        avatar_url,
        bio,
        theme,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: `Profile updated! 🎉
            Here's your new profile: 
            Username: ${username}
            Full Name: ${full_name}
            Avatar URL: ${avatar_url}
            Bio: ${bio}
            Theme: ${theme}
            🎉
      `,
      });
    } catch (error) {
      alert("Error updating the data!");
      toast({
        title: "Error",
        description: `Error updating the profile: ${error}`,
      });
    } finally {
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    updateProfile({
      username: values.username,
      full_name: values.full_name,
      avatar_url: values.avatar_url,
      bio: values.bio,
      theme: values.theme,
    });

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="user name" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="full name" {...field} />
                </FormControl>
                {/* <FormDescription>This is your full name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="avatar url" {...field} />
                </FormControl>
                {/* <FormDescription>This is your avatar.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="bio" {...field} />
                </FormControl>
                {/* <FormDescription>This is your bio.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the theme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="System">System</SelectItem>
                    <SelectItem value="Dark">Dark</SelectItem>
                    <SelectItem value="Light">Light</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-between">
            <Button size="icon" type="button" onClick={() => router.back()}>
              {" "}
              <ArrowLeft />{" "}
            </Button>
            <Button type="submit">{loading ? "..." : "Update"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
