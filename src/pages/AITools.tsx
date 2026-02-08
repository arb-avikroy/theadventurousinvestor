import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
import { modelTypes, categories } from "@/data/aiTools";
import { useAITools, useUserCuratedAITools, useSubmitAITool, type NewUserCuratedTool } from "@/hooks/useAITools";
import { ExternalLink, Search, Bot, Filter, X, Loader2, Plus, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";

const AITools = () => {
  const { data: aiTools = [], isLoading: isLoadingAI, error: errorAI } = useAITools();
  const { data: userTools = [], isLoading: isLoadingUser, error: errorUser } = useUserCuratedAITools();
  const submitTool = useSubmitAITool();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("ai-curated");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModelTypes, setSelectedModelTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<NewUserCuratedTool>({
    name: "",
    description: "",
    category: "",
    model_type: [],
    url: "",
    pricing: "",
    tags: [],
    submitted_by: "",
    submitted_by_email: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [selectedModelTypesForm, setSelectedModelTypesForm] = useState<string[]>([]);

  const currentTools = activeTab === "ai-curated" ? aiTools : userTools;
  const isLoading = activeTab === "ai-curated" ? isLoadingAI : isLoadingUser;
  const error = activeTab === "ai-curated" ? errorAI : errorUser;

  const filteredTools = useMemo(() => {
    return currentTools.filter((tool) => {
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesModelType =
        selectedModelTypes.length === 0 ||
        selectedModelTypes.some((type) => tool.model_type.includes(type));

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(tool.category);

      const matchesPricing =
        selectedPricing.length === 0 || selectedPricing.includes(tool.pricing);

      return matchesSearch && matchesModelType && matchesCategory && matchesPricing;
    });
  }, [searchQuery, selectedModelTypes, selectedCategories, selectedPricing, currentTools]);

  const handleSubmitTool = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.url || !formData.category || !formData.pricing) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (selectedModelTypesForm.length === 0) {
      toast({
        title: "Missing Model Type",
        description: "Please select at least one model type",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitTool.mutateAsync({
        ...formData,
        model_type: selectedModelTypesForm,
      });

      toast({
        title: "Success!",
        description: "Your tool has been submitted for review. It will appear after approval.",
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        model_type: [],
        url: "",
        pricing: "",
        tags: [],
        submitted_by: "",
        submitted_by_email: "",
      });
      setSelectedModelTypesForm([]);
      setTagInput("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit tool. Please check if you've run the database migration.",
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const toggleModelType = (type: string) => {
    setSelectedModelTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const togglePricing = (pricing: string) => {
    setSelectedPricing((prev) =>
      prev.includes(pricing)
        ? prev.filter((p) => p !== pricing)
        : [...prev, pricing]
    );
  };

  const clearAllFilters = () => {
    setSelectedModelTypes([]);
    setSelectedCategories([]);
    setSelectedPricing([]);
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedModelTypes.length +
    selectedCategories.length +
    selectedPricing.length;

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-semibold mb-2 block">Search Tools</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Model Type</Label>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {modelTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedModelTypes.includes(type)}
                  onCheckedChange={() => toggleModelType(type)}
                />
                <Label
                  htmlFor={`type-${type}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Category</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`cat-${category}`}
                className="text-sm cursor-pointer flex-1"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Pricing</Label>
        <div className="space-y-2">
          {["Free", "Freemium", "Paid"].map((pricing) => (
            <div key={pricing} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${pricing}`}
                checked={selectedPricing.includes(pricing)}
                onCheckedChange={() => togglePricing(pricing)}
              />
              <Label
                htmlFor={`price-${pricing}`}
                className="text-sm cursor-pointer flex-1"
              >
                {pricing}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <>
          <Separator />
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters ({activeFiltersCount})
          </Button>
        </>
      )}
    </div>
  );

  const ToolCard = ({ tool }: { tool: typeof currentTools[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{tool.name}</h3>
              <Badge variant="secondary" className="mt-1">
                {tool.pricing}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 flex-1">
          {tool.description}
        </p>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Category
            </p>
            <Badge variant="outline">{tool.category}</Badge>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Model Types
            </p>
            <div className="flex flex-wrap gap-1">
              {tool.model_type.map((type) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Tags
            </p>
            <div className="flex flex-wrap gap-1">
              {tool.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs bg-primary/5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button className="w-full mt-4" variant="default" asChild>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Visit Tool
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );

  const ToolsContent = () => (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : error ? (
        <GlassCard className="p-12 text-center">
          <Bot className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Error loading tools
          </h3>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : "Please try again later"}
          </p>
        </GlassCard>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold">{filteredTools.length}</span> of{" "}
              <span className="font-semibold">{currentTools.length}</span> tools
            </p>
          </div>

          <AnimatePresence mode="wait">
            {filteredTools.length > 0 ? (
              <motion.div
                key="tools-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlassCard className="p-12 text-center">
                  <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {currentTools.length === 0 ? "No tools submitted yet" : "No tools found"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {currentTools.length === 0 && activeTab === "self-curated"
                      ? "Be the first to share a tested AI tool with the community!"
                      : "Try adjusting your filters or search query"}
                  </p>
                  {currentTools.length === 0 && activeTab === "self-curated" ? (
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Tool
                    </Button>
                  ) : (
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  )}
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );

  return (
    <Layout>
      <Helmet>
        <title>AI Tools Directory - The Adventurous Investor</title>
        <meta
          name="description"
          content="Explore curated collection of third-party AI tools and models for productivity, creativity, development, and more."
        />
      </Helmet>

      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI Tools Directory
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover and explore curated third-party AI tools and models
                across different categories and use cases
              </p>
            </motion.div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <TabsList className="grid w-full md:w-auto md:min-w-[400px] grid-cols-2">
                <TabsTrigger value="ai-curated">AI Curated</TabsTrigger>
                <TabsTrigger value="self-curated">Self Curated</TabsTrigger>
              </TabsList>

              {activeTab === "self-curated" && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tool
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Submit a New AI Tool</DialogTitle>
                      <DialogDescription>
                        Share a tested AI tool with the community. Tools will be reviewed before appearing publicly.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitTool} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Tool Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., ChatGPT"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="url">Website URL *</Label>
                        <Input
                          id="url"
                          type="url"
                          value={formData.url}
                          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                          placeholder="https://example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Brief description of what the tool does..."
                          rows={3}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="pricing">Pricing Model *</Label>
                          <Select
                            value={formData.pricing}
                            onValueChange={(value) => setFormData({ ...formData, pricing: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Free">Free</SelectItem>
                              <SelectItem value="Freemium">Freemium</SelectItem>
                              <SelectItem value="Paid">Paid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Model Types</Label>
                        <ScrollArea className="h-[120px] border rounded-md p-3 mt-2">
                          <div className="space-y-2">
                            {modelTypes.map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`form-type-${type}`}
                                  checked={selectedModelTypesForm.includes(type)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedModelTypesForm([...selectedModelTypesForm, type]);
                                    } else {
                                      setSelectedModelTypesForm(selectedModelTypesForm.filter((t) => t !== type));
                                    }
                                  }}
                                />
                                <Label htmlFor={`form-type-${type}`} className="text-sm cursor-pointer">
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      <div>
                        <Label htmlFor="tags">Tags</Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            id="tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addTag();
                              }
                            }}
                            placeholder="Add tags (press Enter)"
                          />
                          <Button type="button" onClick={addTag} variant="outline">
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                              <X
                                className="h-3 w-3 ml-1 cursor-pointer"
                                onClick={() => removeTag(tag)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="submitted_by">Your Name (Optional)</Label>
                          <Input
                            id="submitted_by"
                            value={formData.submitted_by}
                            onChange={(e) => setFormData({ ...formData, submitted_by: e.target.value })}
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="submitted_by_email">Your Email (Optional)</Label>
                          <Input
                            id="submitted_by_email"
                            type="email"
                            value={formData.submitted_by_email}
                            onChange={(e) => setFormData({ ...formData, submitted_by_email: e.target.value })}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={submitTool.isPending}>
                          {submitTool.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Submit Tool
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <TabsContent value="ai-curated" className="mt-0">
              <div className="flex flex-col lg:flex-row gap-8">
                <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                  <div className="sticky top-20">
                    <GlassCard className="p-6">
                      <div className="flex items-center gap-2 mb-6">
                        <Filter className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">Filters</h2>
                      </div>
                      <FilterSection />
                    </GlassCard>
                  </div>
                </aside>

                <div className="lg:hidden">
                  <Button
                    variant="outline"
                    className="w-full mb-4"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                  </Button>

                  <AnimatePresence>
                    {mobileFiltersOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <GlassCard className="p-6 mb-4">
                          <FilterSection />
                        </GlassCard>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <main className="flex-1">
                  <ToolsContent />
                </main>
              </div>
            </TabsContent>

            <TabsContent value="self-curated" className="mt-0">
              <div className="flex flex-col lg:flex-row gap-8">
                <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                  <div className="sticky top-20">
                    <GlassCard className="p-6">
                      <div className="flex items-center gap-2 mb-6">
                        <Filter className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">Filters</h2>
                      </div>
                      <FilterSection />
                    </GlassCard>
                  </div>
                </aside>

                <div className="lg:hidden">
                  <Button
                    variant="outline"
                    className="w-full mb-4"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                  </Button>

                  <AnimatePresence>
                    {mobileFiltersOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <GlassCard className="p-6 mb-4">
                          <FilterSection />
                        </GlassCard>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <main className="flex-1">
                  <ToolsContent />
                </main>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AITools;
